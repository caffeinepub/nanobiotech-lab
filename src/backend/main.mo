import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Student record
  type Student = {
    id : Nat;
    name : Text;
    mobileNo : Text;
    enrollmentNo : Text;
    department : Text;
    labName : Text;
  };

  var nextStudentId = 1;

  // Issue record (material issue/return)
  type IssueRecord = {
    id : Nat;
    studentId : Nat;
    studentName : Text;
    enrollmentNo : Text;
    mobileNo : Text;
    department : Text;
    materialName : Text;
    quantity : Nat;
    dateOfIssue : Time.Time;
    dateOfReturn : ?Time.Time;
    isReturned : Bool;
    remarks : Text;
  };

  var nextIssueId = 1;

  let students = Map.empty<Nat, Student>();
  let issues = Map.empty<Nat, IssueRecord>();

  // Create issue record
  public shared ({ caller }) func createIssueRecord(studentName : Text, enrollmentNo : Text, mobileNo : Text, department : Text, materialName : Text, quantity : Nat, labName : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create issue records");
    };

    let newStudentId = nextStudentId;
    let newStudent : Student = {
      id = newStudentId;
      name = studentName;
      department;
      mobileNo;
      enrollmentNo;
      labName;
    };

    students.add(newStudentId, newStudent);

    let newIssueId = nextIssueId;
    let newIssue : IssueRecord = {
      id = newIssueId;
      studentId = newStudentId;
      studentName;
      enrollmentNo;
      mobileNo;
      department;
      materialName;
      quantity;
      dateOfIssue = Time.now();
      dateOfReturn = null;
      isReturned = false;
      remarks = "";
    };

    issues.add(newIssueId, newIssue);

    nextIssueId += 1;
    nextStudentId += 1;
    newIssueId;
  };

  // Mark item as returned
  public shared ({ caller }) func markAsReturned(issueId : Nat, remarks : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can mark items as returned");
    };

    let issue = issues.get(issueId);
    switch (issue) {
      case (null) {
        Runtime.trap("Issue record not found.");
      };
      case (?record) {
        if (record.isReturned) {
          Runtime.trap("Item is already marked as returned.");
        };
        let updatedIssue : IssueRecord = {
          record with
          isReturned = true;
          dateOfReturn = ?Time.now();
          remarks;
        };
        issues.add(issueId, updatedIssue);
      };
    };
  };

  // Get all issue records
  public query ({ caller }) func getAllIssueRecords() : async [IssueRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view issue records");
    };
    issues.values().toArray();
  };

  // Get pending (unreturned) records
  public query ({ caller }) func getPendingIssues() : async [IssueRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view pending issues");
    };
    issues.filter(func(_id, record) { not record.isReturned }).values().toArray();
  };

  // Check if student has pending issues
  public query ({ caller }) func hasPendingIssues(enrollmentNo : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check pending issues");
    };
    issues.values().find(func(record) { record.enrollmentNo == enrollmentNo and not record.isReturned }) != null;
  };

  // Get all records for a specific student
  public query ({ caller }) func getRecordsForStudent(enrollmentNo : Text) : async [IssueRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view student records");
    };
    issues.filter(func(_id, record) { record.enrollmentNo == enrollmentNo }).values().toArray();
  };

  // Search records by student name or enrollment number
  public query ({ caller }) func searchRecords(searchTerm : Text) : async [IssueRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can search records");
    };
    issues.filter(
      func(_id, record) {
        record.studentName.contains(#text searchTerm) or record.enrollmentNo.contains(#text searchTerm);
      }
    ).values().toArray();
  };

  // Get stats: total issued, total pending, total returned
  public query ({ caller }) func getStats() : async {
    totalIssued : Nat;
    totalPending : Nat;
    totalReturned : Nat;
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view statistics");
    };
    let totalIssued = issues.size();
    let totalPending = issues.filter(func(_id, record) { not record.isReturned }).size();
    let totalReturned = totalIssued - totalPending;
    {
      totalIssued;
      totalPending;
      totalReturned;
    };
  };

  // Delete record (admin only)
  public shared ({ caller }) func deleteRecord(issueId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete records");
    };
    let issue = issues.get(issueId);
    switch (issue) {
      case (null) {
        Runtime.trap("Issue record not found.");
      };
      case (?_) {
        issues.remove(issueId);
      };
    };
  };

  // Check NOC eligibility
  public query ({ caller }) func checkNOCEligibility(enrollmentNo : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check NOC eligibility");
    };
    issues.values().find(func(record) { record.enrollmentNo == enrollmentNo and not record.isReturned }) == null;
  };

  // Get issue record by ID
  public query ({ caller }) func getIssueRecordById(issueId : Nat) : async ?IssueRecord {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view issue records");
    };
    issues.get(issueId);
  };
};
