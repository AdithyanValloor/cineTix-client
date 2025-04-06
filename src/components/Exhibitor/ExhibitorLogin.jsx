import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeClosed } from 'lucide-react';
import { ButtonPrimary } from '../Button/Button';
import { useDispatch } from 'react-redux';
import { saveUser } from '../../redux/features/userSlice';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom'; 

export default function ExhibitorLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = () => {
        let valid = true;
        const newErrors = { email: '', password: '' };

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'Enter a valid email';
            valid = false;
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const response = await axiosInstance.post('/exhibitor/login', {
                email,
                password,
            });

            console.log('Exhibitor login success:', response.data);
            dispatch(saveUser(response?.data?.data));
            
            navigate('/exhibitor/dashboard');

        } catch (err) {
            console.error('Login error:', err);
            if (err.response) {
                setError(err.response?.data?.message || 'Something went wrong!');
            } else {
                setError('Server error. Please try again later.');
            }
        }
    };

    return (
        <div className='flex flex-col p-5 gap-5 pb-20'>
            <div className='w-full h-full flex items-end justify-center'>
                <p className='text-lg sm:text-xl lg:text-2xl text-center'>
                    Exhibitor Login
                </p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-9 w-full relative'>
                <div className='flex flex-col gap-7'>
                    {/* Email Field */}
                    <div className='relative'>
                        <input
                            type='text'
                            name='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value.toLowerCase())}
                            placeholder='Email'
                            className={`font-light w-full bg-transparent outline-none placeholder:text-sm p-2 border-b ${
                                errors.email ? 'border-red-500' : 'border-gray-400'
                            } px-10`}
                        />
                        <Mail strokeWidth={1} size={19} className='absolute top-1/2 -translate-y-1/2 left-2' />
                        {errors.email && <p className='text-red-500 font-light absolute text-xs mt-1'>{errors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div className='relative'>
                        <input
                            type={showPass ? 'text' : 'password'}
                            name='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            className={`font-light w-full bg-transparent outline-none placeholder:text-sm p-2 border-b ${
                                errors.password ? 'border-red-500' : 'border-gray-400'
                            } px-10`}
                        />
                        <Lock strokeWidth={1} size={19} className='absolute top-1/2 -translate-y-1/2 left-2' />
                        <button
                            type='button'
                            onClick={() => setShowPass(!showPass)}
                            className='absolute top-1/2 -translate-y-1/2 right-2 p-2 cursor-pointer'
                        >
                            {showPass ? <Eye strokeWidth={1} size={19} /> : <EyeClosed strokeWidth={1} size={19} />}
                        </button>
                        {errors.password && <p className='text-red-500 font-light absolute text-xs mt-1'>{errors.password}</p>}
                    </div>
                </div>

                {/* Buttons */}
                <div className='flex flex-col gap-2 w-full'>
                    <ButtonPrimary type='submit' text='Login' />
                </div>

                {error && <p className='text-red-500 w-full text-center absolute bottom-[-50px] text-sm'>{error}</p>}
            </form>
        </div>
    );
}
