import VerificationGate from "./security/VerificationGate";

/**
 * The product is a phone-width web app reached from a QR code in the room.
 * On every viewport above 430px it stays exactly that: the same composition,
 * 390px wide, centred on a quiet warm field. No desktop layout exists.
 *
 * VerificationGate sits inside the shell so the human-verification screen
 * (and the branded splash while checking) renders inside the same
 * phone-width card as the rest of the site, rather than full-bleed.
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
