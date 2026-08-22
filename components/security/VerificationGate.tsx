"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import HumanVerification from "./HumanVerification";

const SESSION_KEY = "gg_verified";
const CONFIGURED = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

/**
 * Gates all page content behind Cloudflare Turnstile, once per browser
 * session (sessionStorage — cleared when the tab closes, nothing sensitive
 * stored). If NEXT_PUBLIC_TURNSTILE_SITE_KEY isn't set, the gate is skipped
 * entirely so local dev/builds keep working before the key is provisioned.
 */
export default function VerificationGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState(!CONFIGURED);
  const [checked, setChecked] = useState(!CONFIGURED);

  useEffect(() => {
    if (!CONFIGURED) return;
    setVerified(sessionStorage.getItem(SESSION_KEY) === "1");
    setChecked(true);
  }, []);

  function handleVerified() {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Storage unavailable (private mode, etc.) — still let the guest through
      // for this render; they'll just see the check again next load.
    }
    setVerified(true);
  }

  if (!checked) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center">
        <Image
          src="/images/branding/logo.png"
          alt="Guide Guru Global"
          width={51}
          height={40}
          priority
          className="h-[38px] w-auto opacity-80"
        />
      </div>
    );
  }

  if (!verified) {
    return <HumanVerification onVerified={handleVerified} />;
  }

  return <>{children}</>;
}
