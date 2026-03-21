import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export interface IssueRecord {
    id: bigint;
    enrollmentNo: string;
    studentId: bigint;
    studentName: string;
    dateOfIssue: Time;
    mobileNo: string;
    dateOfReturn?: Time;
    isReturned: boolean;
    quantity: bigint;
    department: string;
    materialName: string;
    remarks: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkNOCEligibility(enrollmentNo: string): Promise<boolean>;
    createIssueRecord(studentName: string, enrollmentNo: string, mobileNo: string, department: string, materialName: string, quantity: bigint, labName: string): Promise<bigint>;
    deleteRecord(issueId: bigint): Promise<void>;
    getAllIssueRecords(): Promise<Array<IssueRecord>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getIssueRecordById(issueId: bigint): Promise<IssueRecord | null>;
    getPendingIssues(): Promise<Array<IssueRecord>>;
    getRecordsForStudent(enrollmentNo: string): Promise<Array<IssueRecord>>;
    getStats(): Promise<{
        totalReturned: bigint;
        totalIssued: bigint;
        totalPending: bigint;
    }>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    hasPendingIssues(enrollmentNo: string): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    markAsReturned(issueId: bigint, remarks: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchRecords(searchTerm: string): Promise<Array<IssueRecord>>;
}
