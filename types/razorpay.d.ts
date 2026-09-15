/** Minimal typing for the Razorpay Checkout client script (window.Razorpay). */
interface RazorpayHandlerResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  /** Fires only after Razorpay's own client-side checks pass — never treat this alone as a confirmed payment, the signature still has to be verified server-side. */
  handler: (response: RazorpayHandlerResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayCheckoutInstance {
  open: () => void;
  close: () => void;
  on: (event: string, handler: (response: unknown) => void) => void;
}

interface Window {
  Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayCheckoutInstance;
}
