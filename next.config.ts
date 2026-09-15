import type { NextConfig } from "next";

/**
 * The future Flask API origin, e.g. "https://api.guideguruglobal.com".
 * Read at build time so the CSP's connect-src can allow it without a code
 * change — just set NEXT_PUBLIC_API_URL and rebuild.
 */
const apiOrigin = (() => {
  try {
    return process.env.NEXT_PUBLIC_API_URL
      ? new URL(process.env.NEXT_PUBLIC_API_URL).origin
      : "";
  } catch {
    return "";
  }
})();

const CLOUDFLARE_CHALLENGES = "https://challenges.cloudflare.com";
/**
 * Razorpay Checkout (components/BookingForm.tsx, lib/razorpay.ts): the SDK
 * is loaded from checkout.razorpay.com, which itself loads a risk-detection
 * bundle + icons from cdn.razorpay.com, opens an in-page iframe (served from
 * api.razorpay.com) for the actual card/UPI/wallet form, and talks to both
 * api.razorpay.com and its lumberjack.razorpay.com logging endpoint. All
 * four need an explicit allowance below — without them the checkout
 * script/frame is silently blocked by CSP and "Proceed to payment" does
 * nothing.
 */
const RAZORPAY_CHECKOUT = "https://checkout.razorpay.com";
const RAZORPAY_API = "https://api.razorpay.com";
const RAZORPAY_LUMBERJACK = "https://lumberjack.razorpay.com";
const RAZORPAY_CDN = "https://cdn.razorpay.com";
const isDev = process.env.NODE_ENV === "development";

/**
 * 'unsafe-inline' is kept for script-src and style-src deliberately, not by
 * default carelessness:
 *  - style-src: the UI uses inline `style={{...}}` for scroll reveals and
 *    the animated journey-route path. Inline style ATTRIBUTES can only be
 *    allowed via 'unsafe-inline' (nonces only cover <style> elements), so
 *    removing this would break existing, approved animations.
 *  - script-src: Next.js's App Router streams RSC payloads via small inline
 *    <script> tags. A nonce-based CSP (via middleware) avoids 'unsafe-inline'
 *    entirely but needs its own careful rollout — tracked as a follow-up in
 *    SECURITY_AUDIT.md rather than risking a broken build here.
 *
 * 'unsafe-eval' is added ONLY in development (`next dev`) — Next's Fast
 * Refresh/HMR runtime uses eval() to apply hot updates with source maps.
 * Without it, every dev-mode page throws a CSP EvalError on load, which
 * breaks React's hydration for client components (e.g. the IntersectionObserver
 * in Reveal.tsx never fires, leaving scroll-reveal content stuck at opacity:0 —
 * this is exactly the "experience cards don't show" bug this fixed). Production
 * builds don't use eval-based HMR, so 'unsafe-eval' is never present there.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${CLOUDFLARE_CHALLENGES} ${RAZORPAY_CHECKOUT} ${RAZORPAY_CDN}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: ${RAZORPAY_CDN}${apiOrigin ? ` ${apiOrigin}` : ""}`,
  "font-src 'self' data:",
  `connect-src 'self' ${CLOUDFLARE_CHALLENGES} ${RAZORPAY_API} ${RAZORPAY_LUMBERJACK}${apiOrigin ? ` ${apiOrigin}` : ""}`,
  `frame-src ${CLOUDFLARE_CHALLENGES} ${RAZORPAY_API} ${RAZORPAY_CHECKOUT}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
]
  .join("; ")
  .trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    // payment: scoped to Razorpay's own origins (not a bare allow) so its
    // checkout iframe can use the Payment Request API for saved cards/UPI —
    // see the RAZORPAY_* comment above. Everything else stays fully blocked.
    value: `camera=(), microphone=(), geolocation=(), payment=(self "${RAZORPAY_API}" "${RAZORPAY_CHECKOUT}"), usb=()`,
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Category cover images are served by the Flask API (see BACKEND_GUIDE.md
    // — cover_image is an absolute URL under NEXT_PUBLIC_API_URL). Everything
    // else still points at /public/images/**.
    remotePatterns: apiOrigin
      ? [
          {
            protocol: new URL(apiOrigin).protocol.replace(":", "") as "http" | "https",
            hostname: new URL(apiOrigin).hostname,
            port: new URL(apiOrigin).port,
          },
        ]
      : [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
