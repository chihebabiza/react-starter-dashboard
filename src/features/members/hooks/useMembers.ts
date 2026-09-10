import { useQuery } from "@tanstack/react-query";
import { membersApi } from "../api/member.api";

export function useMembers() {
  return useQuery({
    queryKey: ["members"],
    queryFn: membersApi.getAll,
  });
}
