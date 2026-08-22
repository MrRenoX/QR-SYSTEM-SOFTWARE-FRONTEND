"use client";

import Image from "next/image";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, RefreshCw, ShieldCheck } from "lucide-react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Status = "loading" | "ready" | "verifying" | "error" | "expired" | "unconfigured";

interface HumanVerificationProps {
  /** Called once Turnstile has issued a token. Verification-state persistence is the caller's job. */
  onVerified: (token: string) => void;
}

/**
 * Frontend-only human verification screen. Renders the real Cloudflare
 * Turnstile widget (no fake checkbox) and reports a token up to the caller
 * on success. The token still needs server-side siteverify against
 * TURNSTILE_SECRET_KEY once the Flask API exists — this component only
 * proves the frontend half of that flow.
 */
export default function HumanVerification({ onVerified }: HumanVerificationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const [status, setStatus] = useState<Status>(SITE_KEY ? "loading" : "unconfigured");

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || !SITE_KEY) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      theme: "light",
      callback: (token: string) => {
        setStatus("verifying");
        onVerified(token);
      },
      "error-callback": () => setStatus("error"),
      "expired-callback": () => setStatus("expired"),
    });
    setStatus("ready");
  }, [onVerified]);

  useEffect(() => {
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  function retry() {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      setStatus("ready");
    }
  }

  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      {SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onLoad={renderWidget}
          onError={() => setStatus("error")}
        />
      )}

      <Image
        src="/images/branding/logo.png"
        alt="Guide Guru Global"
        width={51}
        height={40}
        priority
        className="h-[38px] w-auto"
      />

      <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-terracotta-tint text-terracotta">
        <ShieldCheck size={22} strokeWidth={1.8} aria-hidden="true" />
      </span>

      <h1 className="mt-4 font-serif text-[21px] font-bold leading-tight text-ink">
        Just checking you&apos;re human
      </h1>
      <p className="mt-1.5 max-w-[280px] text-[13px] leading-[1.5] text-ink-muted">
        A quick, automated check before you enter — this keeps the experience
        fast and spam-free for every guest.
      </p>

      <div className="mt-6 min-h-[65px]" aria-live="polite">
        {status === "unconfigured" && (
          <p className="max-w-[260px] text-[12px] leading-[1.5] text-ink-faint">
            Verification isn&apos;t configured in this environment yet.
          </p>
        )}

        {status === "loading" && (
          <p className="text-[12.5px] text-ink-muted">Loading verification…</p>
        )}

        <div ref={containerRef} />

        {status === "verifying" && (
          <p className="text-[12.5px] font-semibold text-whatsapp">Verified — continuing…</p>
        )}

        {(status === "error" || status === "expired") && (
          <div className="flex flex-col items-center gap-2">
            <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-red-600">
              <AlertTriangle size={14} aria-hidden="true" />
              {status === "expired"
                ? "That check expired. Please try again."
                : "Verification failed to load."}
            </p>
            <button
              type="button"
              onClick={retry}
              className="flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-[12.5px] font-semibold text-ink transition-colors hover:border-terracotta/40"
            >
              <RefreshCw size={13} aria-hidden="true" />
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
