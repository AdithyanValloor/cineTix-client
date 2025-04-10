import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from "react-confetti";

const PaymentCanceled = () => {
  const [width, height] = useWindowSize();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
      <Confetti width={width} height={height} numberOfPieces={50} recycle={false} />
      <XCircle className="text-red-600 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Canceled</h1>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Your payment was canceled. No amount has been charged. You can retry the payment from your bookings.
      </p>

      <Link
        to="/"
        className="bg-red-600 text-white px-6 py-2 rounded-xl shadow hover:bg-red-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentCanceled;
