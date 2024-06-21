import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BE_URL } from '../../info';
import SuccessMessageComponent from '../SuccessMessage/SuccessMessageComponent';
import ErroreMessageComponent from '../ErrorMessage/ErroreMessageComponent';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import './Login.css';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [responseData, setResponse] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    userName: '',
    password: '',
    name: '',
    confrimPassword: '',
  });

  const inputHandler = (e) => {
    setResponse(null);
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const passwordToggle = () => {
    setIsShowPassword(!isShowPassword);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (userData.password !== userData.confrimPassword) {
        setResponse({
          success: false,
          message: "Passwords don't match",
        });
        setLoading(false);
      } else {
        const response = await axios.post(`${BE_URL}/auth/register`, userData);
        setResponse(response.data);
        setLoading(false);
        console.log(response.data)
      //   if (response.data.success) {
      //    //  navigate(`/auth/verify/otp/${response.data.data.id}`);
      //   }
      setTimeout(()=>{
         navigate("/auth/signin");
      },1500);
      
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setResponse(error.response.data);
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {responseData && responseData.success && (
        <SuccessMessageComponent success={responseData.success} message={responseData.message} />
      )}

      {responseData && !responseData.success && (
        <ErroreMessageComponent error={responseData.message} />
      )}

      {loading && (
        <div className="flex items-center absolute top-20 left-10 z-10">
          <svg className="animate-spin h-8 w-8 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4zm-2-5.291c1.865 2.114 3 4.896 3 7.938h4c0-6.627-5.373-12-12-12v4z"></path>
          </svg>
          <span className="ml-2">Loading...</span>
        </div>
      )}

      <form onSubmit={formSubmitHandler} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={inputHandler}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-gray-700">Username</label>
          <input
            id="userName"
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={inputHandler}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={inputHandler}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <div className="relative">
            <input
              id="password"
              type={isShowPassword ? 'text' : 'password'}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={inputHandler}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700">
              {isShowPassword ? (
                <AiOutlineEye onClick={passwordToggle} className="cursor-pointer" />
              ) : (
                <AiOutlineEyeInvisible onClick={passwordToggle} className="cursor-pointer" />
              )}
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="confrimPassword" className="block text-gray-700">Confirm Password</label>
          <input
            id="confrimPassword"
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={inputHandler}
          />
        </div>
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200">
          Sign Up
        </button>
        <div className="text-center mt-4">
          <p className="text-gray-700">
            Existing User? <Link to="/auth/signin" className="text-red-500 hover:text-red-700">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
