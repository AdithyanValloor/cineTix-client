import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const StripeWrapper = ({ children }) => (
  <Elements stripe={stripePromise}>{children}</Elements>
);
