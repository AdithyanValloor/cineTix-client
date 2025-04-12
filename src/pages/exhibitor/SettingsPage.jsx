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

  const [originalForm, setOriginalForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch exhibitor profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/exhibitor/profile", { withCredentials: true });
        const data = res.data.data;

        const updatedForm = {
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          mobile: data.mobile || "",
          company: data.company || "",
          oldPassword: "",
          newPassword: "",
        };

        setForm(updatedForm);
        setOriginalForm(updatedForm); // Save initial for comparison
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const hasFormChanged = () => {
    // Check if profile fields changed
    const changedProfileFields = Object.keys(originalForm).some((key) => {
      if (key === "oldPassword" || key === "newPassword") return false;
      return form[key] !== originalForm[key];
    });

    // Password change condition
    const changingPassword = form.oldPassword && form.newPassword;

    return changedProfileFields || changingPassword;
  };

  const handleSubmit = async () => {
    if (!hasFormChanged()) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await axiosInstance.put("/exhibitor/update-profile", form, { withCredentials: true });
      setMessage(res.data.message);

      // Update original form after save
      setOriginalForm({
        ...form,
        oldPassword: "",
        newPassword: "",
      });

      // Reset password fields after update
      setForm((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
      }));
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
          {/* Fields... */}
          {["firstName", "lastName", "email", "company"].map((field) => (
            <div className="form-control" key={field}>
              <label className="label" htmlFor={field}>
                <span className="label-text">{field.replace(/([A-Z])/g, " $1")}</span>
              </label>
              <input
                id={field}
                type="text"
                name={field}
                placeholder={field}
                className="input input-bordered w-full"
                value={form[field]}
                onChange={handleChange}
              />
            </div>
          ))}
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
        {hasFormChanged() && (
        <div className="fixed bottom-0 right-0 px-5 py-2">
          <button
            onClick={handleSubmit}
            className={`btn btn-primary ${loading && "btn-disabled"}`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
        )} 
      </div>
    </div>
  );
}

export default SettingsPage;
