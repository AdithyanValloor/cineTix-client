import React, { useState, useEffect } from "react";
import { ButtonPrimary } from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { saveUser } from "../../redux/features/userSlice";

function ProfilePage() {
  const { userData } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(userData?.profilePic || "https://via.placeholder.com/150");
  const [changesMade, setChangesMade] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      name: userData?.name || "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: userData?.email || "",
      mobile: "",
      identity: null,
      married: null,
      pincode: "",
      address1: "",
      address2: "",
      landmark: "",
      city: "",
      state: "",
    });
  }, [userData]);

  useEffect(() => {
    setChangesMade(JSON.stringify(formData) !== JSON.stringify(userData));
  }, [formData, userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, name: `${formData.firstName} ${formData.lastName}`.trim() });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      if (profilePic) {
        formDataToSend.append("profilePic", profilePic);
      }

      const response = await axiosInstance.put("/user/profile-update", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data && response.data.data) {
        dispatch(saveUser(response?.data?.data));
        setFormData(response.data.data);
        alert("Profile updated successfully!");
      } else {
        alert("Something went wrong.");
      }
      setChangesMade(false);
    } catch (error) {
      alert("Error updating profile.");
    }
    setLoading(false);
  };

  return (
    <div className="pt-20 flex bg-base-200 items-center justify-center min-h-screen">
      <div className="max-w-2xl my-10 w-full mx-auto bg-base-100 shadow-xl rounded-lg relative">
        <div className="rounded-t-lg w-full p-5 bg-gradient-to-t from-base-300 to-red-600 flex items-center font-bold gap-5">
          <label className="w-20 h-20 bg-base rounded-full overflow-hidden cursor-pointer relative">
            <img src={'https://www.shutterstock.com/image-vector/profile-default-avatar-icon-user-600nw-2463844171.jpg'} alt="Profile" className="w-full h-full object-cover bg-green-400" />
            <input type="file" accept="image/*" onChange={handleProfilePicChange} className="absolute inset-0 opacity-0 cursor-pointer" />
          </label>
          <h1 className="text-3xl text-white">Hey, {userData?.name}</h1>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Account Details</h2>

          <div className="mb-6">
            <label className="block font-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded-md"
              disabled={!isEditingEmail}
              value={formData.email}
              onChange={handleChange}
            />
            <button className="text-blue-500 mt-2" onClick={() => setIsEditingEmail(!isEditingEmail)}>
              {isEditingEmail ? "Save" : "Edit"}
            </button>
          </div>

          <h3 className="text-xl font-semibold mb-2">Personal Details</h3>
          <input type="text" name="firstName" placeholder="First Name" className="w-full p-2 border rounded-md mb-3" onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" className="w-full p-2 border rounded-md mb-3" onChange={handleChange} />
          <input type="date" name="dateOfBirth" className="w-full p-2 border rounded-md mb-3" onChange={handleChange} />
        </div>

        {changesMade && (
          <div className="fixed bottom-0 left-0 w-full bg-base-300 shadow-t shadow-lg p-4 flex justify-center">
            <ButtonPrimary onClick={handleSubmit} text={loading ? "Saving..." : "Save Changes"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;