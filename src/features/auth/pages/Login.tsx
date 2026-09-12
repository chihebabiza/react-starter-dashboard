import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "@/features/auth/hooks/useLogin";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/login.schema";

export function Login() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 rounded-lg border p-6"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full rounded border p-2"
          />

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full rounded border p-2"
          />

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {loginMutation.isError && (
          <p className="text-sm text-red-500">Invalid email or password.</p>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded bg-primary p-2 text-primary-foreground"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
