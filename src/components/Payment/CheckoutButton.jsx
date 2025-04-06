import { loadStripe } from "@stripe/stripe-js";
import { axiosInstance } from "../../config/axiosInstance";
import { ButtonPrimary } from "../Button/Button";

const CheckoutButton = ({ showId, seats, totalPrice }) => {
  const handleCheckout = async () => {
    try {
      // Step 1: Create Booking
      const bookingRes = await axiosInstance.post(
        "/booking",
        {
          showId,
          seatStatusIds: seats.map((seat) => seat._id),
        },
        { withCredentials: true }
      );

      console.log("BOOKING RESPONSE : ", bookingRes);

      console.log("SEATS", seats);
      
      
      const bookingId = bookingRes.data?.data?._id;

      // Step 2: Create Stripe Checkout Session
      const sessionRes = await axiosInstance.post(
        "/payments/create-checkout-session",
        { bookingId, seats: seats.map((s) => s.seat), totalPrice },
        { withCredentials: true }
      );

      const { id } = sessionRes.data;

      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error("Checkout error:", error.response?.data || error.message);
    }
  };

  return (
    <ButtonPrimary
      onClick={handleCheckout}
      text={`Pay ₹ ${totalPrice ? totalPrice : 0}`}
    />
  );
};

export default CheckoutButton;

