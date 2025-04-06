import { useRef, useEffect, useState } from "react";
import { ButtonPrimary } from "./Button/Button";

const ProfileForm = ({ formData, handleChange, handleIdentitySelect, handleSubmit, changesMade, loading }) => {
  const [isButtonSticky, setIsButtonSticky] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsButtonSticky(!entry.isIntersecting);
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

  const fields = [
    { label: "Email", name: "email", type: "email" },
    { label: "Mobile", name: "mobile", type: "text" },
    { label: "First Name", name: "firstName", type: "text" },
    { label: "Last Name", name: "lastName", type: "text" },
    { label: "Date of Birth", name: "dateOfBirth", type: "date" },
    { label: "Address Line 1", name: "address1", type: "text" },
    { label: "Address Line 2", name: "address2", type: "text" },
    { label: "Landmark", name: "landmark", type: "text" },
    { label: "City", name: "city", type: "text" },
    { label: "State", name: "state", type: "text" },
  ];

  return (
    <div className="max-w-2xl w-full px-10 pb-10 bg-base-100 py-1 relative">
      <h2 className="text-2xl font-bold my-4">Account Details</h2>

      {fields.map(({ label, name, type }) => (
        <div key={name} className="flex items-center mb-3">
          <label htmlFor={name} className="w-1/4 font-medium">
            {label}
          </label>
          <input
            id={name}
            type={type}
            name={name}
            placeholder={label}
            className="w-3/4 p-2 border-1 border-gray-200 rounded-md"
            value={formData[name] || ""}
            onChange={handleChange}
          />
        </div>
      ))}

      <div className="flex items-center mb-3">
        <label className="w-1/4 font-medium">Gender</label>
        <div className="flex gap-2 w-3/4">
          <button
            type="button"
            className={`p-2 rounded-md cursor-pointer w-1/2 ${
              formData.identity === "male" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleIdentitySelect("male")}
          >
            Male
          </button>
          <button
            type="button"
            className={`p-2 rounded-md cursor-pointer w-1/2 ${
              formData.identity === "female" ? "bg-pink-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleIdentitySelect("female")}
          >
            Female
          </button>
        </div>
      </div>

      {/* Invisible ref marker */}
      <div ref={buttonRef}></div>

      {changesMade && (
        <div
          className={`py-3 w-full flex justify-center items-center ${
            isButtonSticky
              ? "fixed left-0 bottom-0 w-full bg-base-300 shadow-[0_-4px_8px_rgba(0,0,0,0.1)] border-base-200 z-40"
              : "bg-transparent"
          }`}
        >
          <ButtonPrimary
            className={"w-36"}
            onClick={handleSubmit}
            text={
              loading ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                "Save Changes"
              )
            }
          />
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
