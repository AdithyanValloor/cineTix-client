import { Eye, EyeClosed, Lock, Mail, User } from 'lucide-react'
import React, { useState }from 'react'
import { ButtonGoogle, ButtonPrimary } from './Button/Button';
import { useDispatch } from "react-redux";
import { saveUser } from "../redux/features/userSlice";
import { axiosInstance } from '../config/axiosInstance';

function AuthForm() {
    
    const [showPass, setShowPass] = useState(false)
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const [errors, setErrors] = useState({user: "", email: "", password: "" });

    const [newUser, setNewUser] = useState(false)

    const toggleUserMode = () => {

        setNewUser(prev => !prev);
        setUser(""); 
        setEmail("")
        setPassword("")
        setError("")
        setErrors({ user: "", email: "", password: "" }); 
    };

    const validate = () => {
        let valid = true;
        let newErrors = {user:"", email: "", password: "" };

        if (newUser) {

            if (!user.trim()) {
                newErrors.user = "Username is required"
                valid = false
            }else if(user.length < 3){
                newErrors.user = "Username must be at least 3 characters"
                valid = false
            }else if(!/^[a-zA-Z][a-zA-Z0-9]{2,19}$/.test(user)){
                newErrors.user = "Username cannot contain special characters"
            }
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
            valid = false
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Enter a valid email";
            valid = false
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
            valid = false
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            valid = false
        }

        setErrors(newErrors)
        return valid
    };

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const isValid = validate()
        if (!isValid) return
    
        try {
            let response
            if (newUser) {
                response = await axiosInstance.post("/user/signup", { 
                    name: user, 
                    email, 
                    password 
                });
                console.log("======", response.data)

                dispatch(saveUser(response?.data?.data));

            } else {
                response = await axiosInstance.post("/user/login", { 
                    email, 
                    password 
                });
                console.log("======", response) 
                
                dispatch(saveUser(response?.data?.data));
            
                
            }
        } catch (error) {
            console.error("Error:", error.response.data.message)
            
            if (error.response) {
                setError(error.response?.data?.message || "Something went wrong!")
            } else {
                alert("Server error. Please try again later.")
            }
        }
    };

  return (
    <div >
            {/* ---------------------------------------- LOGIN ----------------------------------------------------- */}
        {!newUser && <div className='flex flex-col'>
            <div className="p-5 flex flex-col gap-5 pb-20">
                <div className='w-full h-full flex items-end justify-center'>
                    <p className="text-lg sm:text-xl lg:text-2xl text-center">
                        Welcome
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-9 w-full relative">
                    <div className="flex flex-col gap-7">
                        {/* Email */}
                        <div className="relative">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className={`font-light w-full bg-transparent outline-none placeholder:text-base-content placeholder:text-sm p-2 border-b ${
                                    error || errors.email ? "border-red-500" : "border-gray-400"
                                } px-10`}
                            />
                            <Mail strokeWidth={1} size={19} className="absolute top-1/2 -translate-y-1/2 left-2" />
                            {errors.email && <p className="text-red-500 font-light absolute text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className={`font-light w-full bg-transparent outline-none placeholder:text-base-content placeholder:text-sm  p-2 border-b ${
                                    error || errors.password ? "border-red-500" : "border-gray-400"
                                } px-10`}
                            />
                            <Lock strokeWidth={1} size={19} className="absolute top-1/2 -translate-y-1/2 left-2" />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute top-1/2 -translate-y-1/2 right-2 p-2 cursor-pointer"
                            >
                                {showPass ? <Eye strokeWidth={1} size={19} /> : <EyeClosed strokeWidth={1} size={19} />}
                            </button>
                            {errors.password && <p className="text-red-500 font-light absolute text-xs mt-1">{errors.password}</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className='flex flex-col gap-2 w-full relative'>
                        
                        <ButtonPrimary type={"submit"} text={"Login"}/>
                        <div className="flex items-center gap-2">
                            <hr className="flex-grow border-gray-300" />
                            <p className="text-gray-600 text-sm">or</p>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                        <ButtonGoogle type={"submit"} text={"Continue with Google"}/>
                        
                    </div>

                    <p className='text-center md:text-sm font-light absolute -bottom-14 my-3 left-1/2 -translate-x-1/2'>
                        New user?  
                        <button  
                            type='button' className='text-blue-500 mx-1 cursor-pointer'
                            onClick={toggleUserMode}
                        > Sign up</button>
                    </p>
                    {error && 
                        <p className='text-red-500 ] w-full text-center bottom-12 absolute text-sm mt-1'>
                            {error}
                        </p>
                    }
                </form>
            </div>
        </div>}
{/* ---------------------------------------- SIGNUP ----------------------------------------------------- */}
        {newUser && <div className='flex flex-col justify-between'>
            <div className="p-5 flex flex-col gap-5 pb-20">
                <div className='h-full flex items-end justify-center'>
                    <p className="text-lg sm:text-xl lg:text-2xl ">
                        Sign Up
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-9 w-full relative">
                    <div className="flex flex-col gap-7">
                        {/* Username Field */}
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={user}
                                onChange={(e) => setUser(e.target.value.toLowerCase())}
                                placeholder="Username"
                                className={`font-light w-full bg-transparent outline-none placeholder:text-base-content placeholder:text-sm p-2 border-b ${
                                    errors.user ? "border-red-500" : "border-gray-400"
                                } px-10`}
                            />
                            <User strokeWidth={1} size={19} className="absolute top-1/2 -translate-y-1/2 left-2" />
                            {errors.user && <p className="text-red-500 font-light absolute text-xs mt-1">{errors.user}</p>}
                        </div>

                        {/* Email Field */}
                        <div className="relative">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Email"
                                className={`font-light w-full bg-transparent outline-none placeholder:text-base-content placeholder:text-sm p-2 border-b ${
                                    errors.email ? "border-red-500" : "border-gray-400"
                                } px-10`}
                            />
                            <Mail strokeWidth={1} size={19} className="absolute top-1/2 -translate-y-1/2 left-2" />
                            {errors.email && <p className="text-red-500 font-light absolute text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className={`font-light w-full bg-transparent outline-none placeholder:text-base-content placeholder:text-sm  p-2 border-b ${
                                    errors.password ? "border-red-500" : "border-gray-400"
                                } px-10`}
                            />
                            <Lock strokeWidth={1} size={19} className="absolute top-1/2 -translate-y-1/2 left-2" />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute top-1/2 -translate-y-1/2 right-2 p-2 cursor-pointer"
                            >
                                {showPass ? <Eye strokeWidth={1} size={19} /> : <EyeClosed strokeWidth={1} size={19} />}
                            </button>
                            {errors.password && <p className="text-red-500 font-light absolute text-xs mt-1">{errors.password}</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className='flex flex-col gap-2 w-full relative'>
            
                        <ButtonPrimary type={"submit"} text={"Signup"}/>
                        <div className="flex items-center gap-2">
                            <hr className="flex-grow border-gray-300" />
                            <p className="text-gray-600 text-sm">or</p>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                        <ButtonGoogle type={"submit"} text={"Sign up with Google"}/>
                        
                    </div>

                    {/* Signup and Login switch */}
                    <p className='text-center md:text-sm font-light w-full absolute -bottom-14 my-3 left-1/2 -translate-x-1/2'>
                        Already have an acount? 
                        <button  
                            type='button' className='text-blue-500 mx-1 cursor-pointer'
                            onClick={toggleUserMode}
                            
                        >Login</button>
                    </p>
                    {error && 
                        <p className='text-red-500 ] w-full text-center bottom-12 absolute text-sm mt-1'>
                            {error}
                        </p>
                    }
                </form>
            </div>

        </div>}
            
    </div>

  )
}

export default AuthForm
