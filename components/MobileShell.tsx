import VerificationGate from "./security/VerificationGate";

/**
 * The product is a phone-width web app reached from a QR code in the room.
 * <=430px (phone) and >=1440px (real desktop) both render the same fixed
 * 390px composition, centred on a quiet warm field. In between (431-1439px
 * — the tablet/iPad band), the shell widens and components reflow into
 * genuine multi-column layouts instead of just stretching the phone column;
 * see the three-tier `.mobile-app` rules in globals.css.
 *
 * VerificationGate sits inside the shell so the human-verification screen
 * (and the branded splash while checking) renders inside the same shell
 * as the rest of the site, rather than full-bleed.
 */
export default function MobileShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100svh] justify-center">
      <div className="mobile-app">
        <VerificationGate>{children}</VerificationGate>
      </div>
    </div>
  );
}
