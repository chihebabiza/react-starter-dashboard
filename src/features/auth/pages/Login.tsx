import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, BookOpen, LockKeyhole, Mail } from "lucide-react";

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
    <div className="min-h-screen bg-[#f5f1ea] p-4 text-[#1b2523] sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_80px_-32px_rgba(27,37,35,0.35)] sm:min-h-[calc(100vh-3rem)] lg:grid-cols-[1.05fr_0.95fr] lg:min-h-[calc(100vh-4rem)]">
        <section className="relative hidden overflow-hidden bg-[#173c3a] p-10 text-[#f7f3eb] lg:flex lg:flex-col lg:justify-between lg:p-14">
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border-[42px] border-[#d7e65f]/20" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full border-[56px] border-[#f3a35c]/20" />

          <div className="relative flex items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d7e65f] text-[#173c3a]">
              <BookOpen size={20} strokeWidth={2.4} />
            </span>
            BookFlow
          </div>

          <div className="relative max-w-md">
            <p className="mb-5 text-xs font-semibold tracking-[0.24em] text-[#d7e65f] uppercase">
              Your library, in rhythm
            </p>
            <h2 className="text-5xl leading-[1.02] font-semibold tracking-[-0.04em] xl:text-6xl">
              Make room for the next great story.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-[#c6d4ce]">
              Keep every title, reader, and lending moment moving together.
            </p>
          </div>

          <p className="relative text-xs tracking-[0.12em] text-[#9db5ae] uppercase">
            A calmer way to run your library
          </p>
        </section>

        <main className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-7"
      >
        <div>
          <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf2c6] text-[#173c3a] lg:hidden">
            <BookOpen size={21} strokeWidth={2.3} />
          </div>
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#e28d4a] uppercase">
            Welcome back
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#173c3a]">
            Sign in to BookFlow
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#71807b]">
            Continue managing your library with clarity.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-[#30403c]">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-4 -translate-y-1/2 text-[#8b9b94]" size={18} />
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="h-12 w-full rounded-xl border border-[#dbe2dc] bg-[#fbfcfa] pr-4 pl-11 text-sm outline-none transition placeholder:text-[#a9b4ae] focus:border-[#173c3a] focus:ring-4 focus:ring-[#d7e65f]/30"
          />
          </div>

          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-[#30403c]">
            Password
          </label>
          <div className="relative">
            <LockKeyhole className="absolute top-1/2 left-4 -translate-y-1/2 text-[#8b9b94]" size={18} />
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className="h-12 w-full rounded-xl border border-[#dbe2dc] bg-[#fbfcfa] pr-4 pl-11 text-sm outline-none transition placeholder:text-[#a9b4ae] focus:border-[#173c3a] focus:ring-4 focus:ring-[#d7e65f]/30"
          />
          </div>

          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {loginMutation.isError && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Invalid email or password.
          </p>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#173c3a] text-sm font-semibold text-white transition hover:bg-[#235651] focus:ring-4 focus:ring-[#d7e65f]/40 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loginMutation.isPending ? "Signing in..." : "Sign in"}
          {!loginMutation.isPending && <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />}
        </button>
      </form>
        </main>
      </div>
    </div>
  );
}
