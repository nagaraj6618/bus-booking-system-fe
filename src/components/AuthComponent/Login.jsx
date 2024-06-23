import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BE_URL } from '../../info';
import SuccessMessageComponent from '../SuccessMessage/SuccessMessageComponent';
import ErroreMessageComponent from '../ErrorMessage/ErroreMessageComponent';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponse] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    userNameOrEmail: '',
    password: '',
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
      const response = await axios.post(`${BE_URL}/auth/login`, userData);
      setResponse(response.data);
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('timeIn', Date.now());
      sessionStorage.setItem('timeOut', Date.now() + 50 * 60 * 1000);

      localStorage.setItem('name', response.data.data.name);
      localStorage.setItem('userName', response.data.data.userName);
      localStorage.setItem('role', response.data.data.role);
      setLoading(false);
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      setLoading(false);
      if (!error.response) {
        setResponse({
          message: 'Check the Internet Connection',
          success: false,
        });
      } else {
        setResponse(error.response.data);
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
          <svg
            className="animate-spin h-8 w-8 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4zm-2-5.291c1.865 2.114 3 4.896 3 7.938h4c0-6.627-5.373-12-12-12v4z"
            ></path>
          </svg>
          <span className="ml-2">Loading...</span>
        </div>
      )}

      <form onSubmit={formSubmitHandler} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="userNameOrEmail" className="block text-gray-700">
            Email/Username
          </label>
          <input
            id="userNameOrEmail"
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={inputHandler}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
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
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200">
          Login
        </button>
        <div className="text-center mt-4">
          <p className="text-gray-700">
            New User? <Link to="/auth/signup" className="text-red-500 hover:text-red-700">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
