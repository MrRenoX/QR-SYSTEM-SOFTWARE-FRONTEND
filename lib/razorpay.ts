import type { BookingOrder } from "@/types/api/booking";

/** True once the Razorpay checkout.js script has attached `window.Razorpay`. */
export function isRazorpayReady(): boolean {
  return typeof window !== "undefined" && typeof window.Razorpay === "function";
}

/**
 * Opens the Razorpay checkout modal for a booking order created by
 * `createBooking()`. `onSuccess` receives the raw handler response
 * untouched — it must be forwarded as-is to `verifyBookingPayment()`, which
 * is the only place a booking actually gets confirmed (the signature check
 * happens server-side, against a secret this frontend never has access to).
 */
export function openRazorpayCheckout({
  order,
  brandName,
  prefill,
  onSuccess,
  onDismiss,
}: {
  order: BookingOrder;
  brandName: string;
  prefill?: { name?: string; email?: string; contact?: string };
  onSuccess: (response: RazorpayHandlerResponse) => void;
  onDismiss: () => void;
}): boolean {
  if (!isRazorpayReady()) return false;

  const checkout = new window.Razorpay!({
    key: order.razorpayKeyId,
    amount: order.amount,
    currency: order.currency,
    order_id: order.razorpayOrderId,
    name: brandName,
    description: `Booking ${order.bookingRef}`,
    prefill,
    theme: { color: "#D9A24B" },
    handler: onSuccess,
    modal: { ondismiss: onDismiss },
  });
  checkout.open();
  return true;
}
