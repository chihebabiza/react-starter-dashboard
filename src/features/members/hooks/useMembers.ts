import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { membersApi } from "@/features/members/api/member.api";
import type {
  MemberCreate,
  MemberUpdate,
} from "@/features/members/types/member.types";

const MEMBERS_QUERY_KEY = ["members"];

export function useMembers() {
  return useQuery({
    queryKey: MEMBERS_QUERY_KEY,
    queryFn: membersApi.getAll,
  });
}

export function useMember(id: number) {
  return useQuery({
    queryKey: [...MEMBERS_QUERY_KEY, id],
    queryFn: () => membersApi.getById(id),
    enabled: id > 0,
  });
}

export function useCreateMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (member: MemberCreate) => membersApi.create(member),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMBERS_QUERY_KEY });
    },
  });
}

export function useUpdateMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, member }: { id: number; member: MemberUpdate }) =>
      membersApi.update(id, member),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMBERS_QUERY_KEY });
    },
  });
}

export function useDeleteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => membersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMBERS_QUERY_KEY });
    },
  });
}
