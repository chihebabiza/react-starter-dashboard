import { useQuery } from "@tanstack/react-query";
import { authorsApi } from "../api/member.api";

export function useAuthors() {
  return useQuery({
    queryKey: ["authors"],
    queryFn: authorsApi.getAll,
  });
}
