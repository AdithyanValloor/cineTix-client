import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';




const PaymentSuccess = () => {

  const [width, height] = useWindowSize();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
      <Confetti width={width} height={height} />
      <CheckCircle2 className="text-green-600 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">Payment Successful!</h1>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Your seats have been booked successfully. A confirmation email has been sent to your registered email.
      </p>

      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-2 rounded-xl shadow hover:bg-green-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;

