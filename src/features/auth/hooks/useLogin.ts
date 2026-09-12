import { useMutation } from "@tanstack/react-query";

import { usersApi } from "@/features/users/api/users.api";
import type { UserLogin } from "@/features/users/types/user.types";

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: UserLogin) => usersApi.login(credentials),

    onSuccess: (response) => {
      localStorage.setItem("token", response.token);
    },
  });
}
