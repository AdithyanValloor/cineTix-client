import React, { useState, useEffect, useCallback, useRef } from "react";
import { ButtonPrimary, ButtonPrimaryOutline } from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { saveUser } from "../../redux/features/userSlice";
import { MdAddAPhoto } from "react-icons/md";
import Cropper from "react-easy-crop";
import {getCroppedImg} from "../../utils/CropUtil";
import ProfileForm from "../../components/ProfileForm";

function ProfilePage() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    mobile: "",
    identity: "",
    married: "",
    pincode: "",
    address1: "",
    address2: "",
    landmark: "",
    city: "",
    state: "",
  });


  const buttonRef = useRef(null);
  
  const [isButtonOutOfView, setIsButtonOutOfView] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("https://as2.ftcdn.net/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsButtonOutOfView(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 1.0,
      }
    );
  
    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }
  
    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        dateOfBirth: userData.dateOfBirth ? userData.dateOfBirth.split("T")[0] : "",
        email: userData.email || "",
        mobile: userData.mobile || "",
        identity: userData.identity || "",
        married: userData.married || "",
        pincode: userData.pincode || "",
        address1: userData.address1 || "",
        address2: userData.address2 || "",
        landmark: userData.landmark || "",
        city: userData.city || "",
        state: userData.state || "",
      }));
  
      const url = userData?.profilePicture?.url;
      if (url) setPreview(url);
    }
  }, [userData]);
  
  

  useEffect(() => {
    if (!userData) return;
  
    const relevantKeys = [
      "firstName", "lastName", "dateOfBirth", "email", "mobile", "identity", "married",
      "pincode", "address1", "address2", "landmark", "city", "state"
    ];
  
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      return new Date(dateStr).toISOString().split("T")[0];
    };
  
    let formChanged = false;
  
    for (let key of relevantKeys) {
      const userVal = userData[key] ?? "";
      const formVal = formData[key] ?? "";
  
      const normalizedUserVal = key === "dateOfBirth" ? formatDate(userVal) : String(userVal);
      const normalizedFormVal = key === "dateOfBirth" ? formatDate(formVal) : String(formVal);
  
      if (normalizedUserVal !== normalizedFormVal) {
        formChanged = true;
        break;
      }
    }
  
    const picChanged = preview !== (userData?.profilePicture?.url || "");
  
    setChangesMade(formChanged || picChanged);
  }, [formData, preview, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleIdentitySelect = (value) => {
    setFormData((prevData) => ({ ...prevData, identity: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }

    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setShowCropModal(true);

  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCropSave = async () => {
    try {
      const croppedBlob = await getCroppedImg(preview, croppedAreaPixels);
      const croppedFile = new File([croppedBlob], "profile.jpg", { type: "image/jpeg" });
  
      console.log("Cropped File:", croppedFile);
      console.log("Cropped Blob:", croppedBlob);
  
      setProfilePic(croppedFile);
      setPreview(URL.createObjectURL(croppedBlob)); 
      setShowCropModal(false);
    } catch (error) {
      console.error("Error in Cropping Function:", error);
      alert("Something went wrong while cropping the image.");
    }
  };
  


  console.log("PREVIEW : ", preview);
  
  

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      if (profilePic) {
        formDataToSend.append("profilePicture", profilePic);
      }

      const response = await axiosInstance.put("/user/profile-update", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.data && response.data.data) {
        dispatch(saveUser(response.data.data));
        setFormData(response.data.data);
        alert("Profile updated successfully!");
      } else {
        alert("Something went wrong.");
      }
      setChangesMade(false);

      } catch (error) {
        console.error("Update Error:", error);
        alert(error?.response?.data?.message || error.message || "Error updating profile.");
      }
  
    setLoading(false);
  };

  return (
    <div className="pt-36 md:pt-24 pb-10 bg-base-200">
      {showCropModal && (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-[5px] flex items-center justify-center">
          <div className="w-96 max-w-lg bg-white p-2 rounded-lg shadow-lg">
            <h1 className="text-center py-1 text-lg">Crop Profile Picture</h1>
            {/* Cropper container with fixed aspect ratio */}
            <div className="relative w-full h-[300px] bg-gray-100">
              <Cropper
                image={preview}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="flex  gap-3 mt-4">
              <ButtonPrimaryOutline onClick={() => setShowCropModal(false)} text={"Cancel"}/>
              <ButtonPrimary onClick={handleCropSave} text={"Save"}/>
            </div>
          </div>
        </div>
      )}


      <div className="flex justify-center">
        <div className="max-w-2xl w-full bg-base-300 rounded-lg shadow-xl">
          <div className="bg-red-400 p-2 md:rounded-t-lg flex items-center gap-5 text-white">
            <label className="w-20 h-20 bg-base rounded-full overflow-hidden cursor-pointer relative group">
              <div className="absolute bottom-0 w-full h-[25%] bg-base-content/45 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-all">
                <MdAddAPhoto className="text-base-300" />
              </div>
              <img src={preview} alt="Profile" className="w-full h-full object-cover" />
              <input type="file" accept="image/*" onChange={handleProfilePicChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            </label>
            <h1 className="text-2xl lg:text-3xl">Hey, {userData?.firstName} {userData?.lastName}</h1>
          </div>

          <ProfileForm
            formData={formData}
            handleChange={handleChange}
            handleIdentitySelect={handleIdentitySelect}
            handleSubmit={handleSubmit}
            changesMade={changesMade}
            loading={loading}
            buttonRef={buttonRef}
            isFixed={isButtonOutOfView}
          />
          
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;