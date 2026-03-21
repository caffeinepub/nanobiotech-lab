import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IssueRecord } from "../backend";
import { useActor } from "./useActor";

export function useGetAllRecords() {
  const { actor, isFetching } = useActor();
  return useQuery<IssueRecord[]>({
    queryKey: ["allRecords"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllIssueRecords();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor)
        return { totalIssued: 0n, totalPending: 0n, totalReturned: 0n };
      return actor.getStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetStudentRecords(enrollmentNo: string) {
  const { actor, isFetching } = useActor();
  return useQuery<IssueRecord[]>({
    queryKey: ["studentRecords", enrollmentNo],
    queryFn: async () => {
      if (!actor || !enrollmentNo) return [];
      return actor.getRecordsForStudent(enrollmentNo);
    },
    enabled: !!actor && !isFetching && !!enrollmentNo,
  });
}

export function useCheckNOC(enrollmentNo: string) {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["nocCheck", enrollmentNo],
    queryFn: async () => {
      if (!actor || !enrollmentNo) return false;
      return actor.checkNOCEligibility(enrollmentNo);
    },
    enabled: !!actor && !isFetching && !!enrollmentNo,
  });
}

export function useSearchRecords(query: string) {
  const { actor, isFetching } = useActor();
  return useQuery<IssueRecord[]>({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!actor || !query.trim()) return [];
      return actor.searchRecords(query);
    },
    enabled: !!actor && !isFetching && query.trim().length > 0,
  });
}

export function useCreateIssueRecord() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      studentName: string;
      enrollmentNo: string;
      mobileNo: string;
      department: string;
      materialName: string;
      quantity: bigint;
      labName: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createIssueRecord(
        data.studentName,
        data.enrollmentNo,
        data.mobileNo,
        data.department,
        data.materialName,
        data.quantity,
        data.labName,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allRecords"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useMarkAsReturned() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, remarks }: { id: bigint; remarks: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.markAsReturned(id, remarks);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allRecords"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
      qc.invalidateQueries({ queryKey: ["studentRecords"] });
    },
  });
}

export function useDeleteRecord() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteRecord(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allRecords"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const query = useQuery({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}
