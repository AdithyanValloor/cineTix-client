import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

function SettingsPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    company: "",
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch exhibitor profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/exhibitor/profile");
        const data = res.data.data;

        console.log("RESPONSE : ", res.data.data.mobile);
        
        setForm((prev) => ({
          ...prev,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          mobile: data.mobile || "",
          company: data.company || "",
        }));
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await axiosInstance.put("/exhibitor/update-profile", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-base-content/70">
          Update your profile, contact info, and password.
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-base-100 p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label" htmlFor="firstName">
              <span className="label-text">First Name</span>
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="First Name"
              className="input input-bordered w-full"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="lastName">
              <span className="label-text">Last Name</span>
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="input input-bordered w-full"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Email Address</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email Address"
              className="input input-bordered w-full"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="company">
              <span className="label-text">Company Name</span>
            </label>
            <input
              id="company"
              type="text"
              name="company"
              placeholder="Company"
              className="input input-bordered w-full"
              value={form.company}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-base-100 p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">Contact Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="mobile"
            placeholder="Phone Number"
            className="input input-bordered w-full"
            value={form.mobile}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Password Change Section */}
      <div className="bg-base-100 p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">Change Password</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="password"
            name="oldPassword"
            placeholder="Current Password"
            className="input input-bordered w-full"
            value={form.oldPassword}
            onChange={handleChange}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="input input-bordered w-full"
            value={form.newPassword}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Save Button and Message */}
      <div className="text-right space-y-2">
        {message && (
          <p
            className={`${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <button
          onClick={handleSubmit}
          className={`btn btn-primary ${loading && "btn-disabled"}`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
