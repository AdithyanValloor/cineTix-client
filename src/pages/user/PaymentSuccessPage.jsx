import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { axiosInstance } from "../../config/axiosInstance";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  const [width, height] = useWindowSize();
  const [status, setStatus] = useState("pending"); 

  useEffect(() => {
    if (!sessionId) {
      setStatus("failed");
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await axiosInstance.post(
          "/payments/verify-payment",
          { sessionId },
          { withCredentials: true }
        );

        if (res.data?.success) {
          setStatus("success");
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Verification error:", err.message);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [sessionId]);

  if (status === "pending") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="text-2xl font-semibold text-gray-600">Verifying Payment...</h1>
        <p className="text-gray-500 mt-2">Please wait while we confirm your booking.</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
        <XCircle className="text-red-600 w-20 h-20 mb-4" />
        <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Failed!</h1>
        <p className="text-gray-600 text-center max-w-md mb-6">
          We couldn't confirm your payment. If you believe this is a mistake, please try again or contact support.
        </p>

        <Link
          to="/"
          className="bg-red-600 text-white px-6 py-2 rounded-xl shadow hover:bg-red-700 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

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
