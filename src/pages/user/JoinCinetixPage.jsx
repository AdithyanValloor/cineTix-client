import React, { useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { ButtonPrimary } from '../../components/Button/Button';

function JoinCinetixPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    company: '',
  });

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/exhibitor/register', formData, {
        withCredentials: true,
      });

      setMessage('Registration successful! Please wait for admin approval.');
      setIsSuccess(true);

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobile: '',
        company: '',
      });

    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
      setIsSuccess(false);
    }
  };

  return (
    <div className="max-w-md h-lvh mx-auto pt-24 p-6">
      <div className="bg-base-200 shadow p-10 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Join Cinetix as an Exhibitor</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["firstName", "lastName", "email", "password", "mobile", "company"].map((field) => (
            <div key={field} className="flex items-center gap-4">
              <label htmlFor={field} className="w-32 text-right font-medium capitalize">
                {field === "phone" ? "Phone Number" : field}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                id={field}
                name={field}
                placeholder={field[0].toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                className="flex-1 border p-2 border-gray-200 rounded-md"
                required
              />
            </div>
          ))}
          <div className="text-center">
            <ButtonPrimary type={"submit"} text={"Register"} />
          </div>
        </form>

        {message && (
          <p className={`mt-4 text-center text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default JoinCinetixPage;
