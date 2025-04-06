import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { ButtonPrimary } from '../../components/Button/Button';

function JoinCinetixPage() {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    company: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/exhibitor/register', formData, { withCredentials: true });
      setMessage(res.data.message || 'Exhibitor registered successfully');

      navigate('/exhibitor/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto pt-24 p-6">
      <h1 className="text-2xl font-bold mb-4">Join Cinetix as an Exhibitor</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {["firstName", "lastName", "email", "password", "phone", "company"].map((field) => (
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
          <ButtonPrimary type={"submit"} text={"Register"}/>
        </div>
      </form>


      {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
    </div>
  );
}

export default JoinCinetixPage;
