"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, EyeOff, LogIn } from "lucide-react";
import {
  adminErrorTextClass,
  adminInputClass,
  adminInputErrorClass,
  adminLabelClass,
  adminPrimaryButtonClass,
} from "@/lib/admin/formStyles";
import { isAuthenticated, login } from "@/services/admin/authService";

function validateEmail(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Enter a valid email address.";
  return undefined;
}

function validatePassword(value: string): string | undefined {
  if (!value) return "Password is required.";
  if (value.length < 6) return "Password must be at least 6 characters.";
  return undefined;
}

export default function SuperAdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [forgotOpen, setForgotOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) router.replace("/dashboard/super-admin");
  }, [router]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors = { email: validateEmail(email), password: validatePassword(password) };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    setStatus("submitting");
    setFormError(null);

    const result = await login({ email, password }, remember);
    if (result.ok) {
      router.replace("/dashboard/super-admin");
      return;
    }
    setStatus("error");
    setFormError(result.message);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-admin-sidebar px-4 py-10">
      <div className="w-full max-w-[400px]">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-2xl bg-white px-5 py-3 shadow-lg">
            <Image
              src="/images/branding/logo.png"
              alt="Guide Guru Global"
              width={51}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
          <h1 className="text-[19px] font-bold text-admin-text">Super Admin Login</h1>
          <p className="mt-1 text-[13px] text-admin-muted">Sign in to manage the Anubhav experience.</p>

          <form onSubmit={onSubmit} noValidate className="mt-5 space-y-4">
            <div>
              <label htmlFor="admin-email" className={adminLabelClass}>
                Email Address
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setErrors((current) => ({ ...current, email: undefined }));
                }}
                className={errors.email ? adminInputErrorClass : adminInputClass}
                placeholder="admin@anubhav.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "admin-email-error" : undefined}
              />
              {errors.email && (
                <p id="admin-email-error" className={adminErrorTextClass}>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="admin-password" className={adminLabelClass}>
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setErrors((current) => ({ ...current, password: undefined }));
                  }}
                  className={`${errors.password ? adminInputErrorClass : adminInputClass} pr-10`}
                  placeholder="••••••••"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "admin-password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-admin-muted hover:text-admin-text"
                >
                  {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                </button>
              </div>
              {errors.password && (
                <p id="admin-password-error" className={adminErrorTextClass}>
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-[12.5px] font-medium text-admin-muted">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="h-4 w-4 rounded border-admin-border text-admin-accent focus:ring-admin-accent/30"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => setForgotOpen((v) => !v)}
                className="text-[12.5px] font-semibold text-admin-accent hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {forgotOpen && (
              <p className="rounded-xl bg-admin-bg px-3.5 py-2.5 text-[12px] text-admin-muted">
                Password recovery is coming soon. Please contact another admin for help in the meantime.
              </p>
            )}

            {status === "error" && formError && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-[12.5px] text-rose-700"
              >
                <AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                {formError}
              </div>
            )}

            <button type="submit" disabled={status === "submitting"} className={`${adminPrimaryButtonClass} w-full`}>
              <LogIn size={16} aria-hidden="true" />
              {status === "submitting" ? "Signing in…" : "Login"}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-[11.5px] text-white/40">
          © 2026 Guide Guru Global. All rights reserved.
        </p>
      </div>
    </div>
  );
}
