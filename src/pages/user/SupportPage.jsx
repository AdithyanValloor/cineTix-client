import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "",
    description: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    const { name, email, issueType, description } = formData;
    if (!name || !email || !issueType || !description) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return;
    }

    try {
      const res = await axiosInstance.post("/support", formData);
      setStatus({ type: "success", message: res.data.message });
      setFormData({ name: "", email: "", issueType: "", description: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err.response?.data?.message || "Something went wrong. Try again.",
      });
    }
  };

  return (
    <div className="max-w-5xl pt-36 md:pt-26 mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Support Center</h1>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <ul className="space-y-6">
          <li>
            <strong>How do I cancel a booking?</strong>
            <p className="text-gray-600">
              Go to your bookings, click on the show, and tap “Cancel Booking”. Refunds depend on the theater’s cancellation policy.
            </p>
          </li>
          <li>
            <strong>What should I do if my payment fails?</strong>
            <p className="text-gray-600">
              Please try again or contact support with a screenshot of the issue.
            </p>
          </li>
          <li>
            <strong>Can I change my seat after booking?</strong>
            <p className="text-gray-600">
              Seat changes are not allowed once booked. Please cancel and rebook if needed.
            </p>
          </li>
        </ul>
      </section>

      {/* Contact Form */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Need More Help?</h2>

        {status.message && (
          <div
            className={`p-3 mb-4 rounded text-center ${
              status.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}

        <form className="grid gap-6 sm:grid-cols-2 sm:gap-6" onSubmit={handleSubmit}>
          <div className="col-span-2 sm:col-span-1">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="col-span-2">
            <select
              name="issueType"
              value={formData.issueType}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            >
              <option value="">Select Issue Type</option>
              <option value="Booking">Booking</option>
              <option value="Payment">Payment</option>
              <option value="Technical">Technical</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-span-2">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your issue..."
              rows={5}
              className="w-full p-3 border rounded-md"
            ></textarea>
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </section>

      {/* Contact Info */}
      <section className="text-sm text-gray-700 space-y-1 text-center sm:text-left">
        <p>
          <strong>Email:</strong> support@cinetix.com
        </p>
        <p>
          <strong>Phone:</strong> +1 (800) 123-4567
        </p>
        <p>
          <strong>Support Hours:</strong> Mon–Sat, 9:00 AM to 6:00 PM
        </p>
      </section>
    </div>
  );
};

export default SupportPage;
