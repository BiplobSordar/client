import { useLoginUserMutation, useRegisterUserMutation } from "@/app/fetures/api/authApi.js";
import { useToast } from "@/contexts/ToastContext";
import React, { act, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()

  const [registerUser, { data: registerData, isLoading: registerIsLoading, isSuccess: registerIsSuccess, status: registerStatus, error: registerError }] = useRegisterUserMutation()
  const [loginUser, { data: loginData, isError: loginIsError, isLoading: loginIsLoading, isSuccess: loginIsSuccess, error: loginError }] = useLoginUserMutation()
  const [activeTab, setActiveTab] = useState("signin");
  const [darkMode, setDarkMode] = useState(false);
  const [input, setInput] = useState({
    userName: '',
    email: '',
    password: ""
  })


  const addToast = useToast()

  const handelInput = (e) => {


    setInput({ ...input, [e.target.name]: e.target.value })

  }

  const handelSubmit = async (e, type) => {

    e.preventDefault()

    const inputData = type === 'signUp' ? input : { email: input.email, password: input.password }
    const action = type === 'signUp' ? registerUser : loginUser

    await action(inputData)



  }


  // Handel Register Toast After Api Call

  useEffect(() => {

    if (registerError) {

      if (registerError?.data?.status === 500) {
        addToast(registerError?.data?.message, 'error')
      }


    }

    if (registerData) {
      if (registerData?.status == 200) {
        addToast(registerData?.message, 'success')

        setActiveTab('signin')
      }
    }

  }, [registerError, registerData])


  // Handel Login Toast After Api Call


  useEffect(() => {
    if (loginError) {
      if (loginError?.data?.status === 500) {
        addToast(loginError?.data?.message, 'error')
      }
    }

    if (loginData) {
      if (loginData?.status === 200) {
        addToast(loginData?.message, 'success')
        if(loginData.role=='instructor'){
          navigate('/admin')
        }else{

          navigate('/')
        }
      }
    }

  }, [loginData, loginError])


  useEffect(() => {
    setInput({
      userName: '',
      email: '',
      password: ""
    })

  }, [activeTab]
  )



  return (
    <div
      className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        } transition-colors duration-1000`}
    >
      {/* Dark Mode Toggle */}
      {/* <div className="absolute top-4 right-4 ">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full border border-black ${darkMode
            ? "bg-white text-black hover:bg-gray-300"
            : "bg-black text-white hover:bg-gray-800"
            }`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div> */}

      {/* Form Container */}
      <div className="w-full max-w-md p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
        {/* Tabs Navigation */}
        <div className="flex justify-center space-x-8 mb-6">
          <button
            onClick={() => setActiveTab("signin")}
            className={`px-4 py-2 font-semibold ${activeTab === "signin"
              ? "border-b-4 border-black dark:border-white text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400"
              }`}
          >
            Sign In
          </button>
          <button
            disabled={loginIsLoading}
            onClick={() => setActiveTab("signup")}
            className={`px-4 py-2 font-semibold ${activeTab === "signup"
              ? "border-b-4 border-black dark:border-white text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400"
              }`}
          >
            {/* {loginIsLoading ? 'Please Wait' : ' Sign Up'} */}
            Sign Up
          </button>
        </div>

        {/* Animated Tab Content */}
        <div className="relative overflow-hidden">
          <div
            className={`transition-transform duration-1000 ease-in-out ${activeTab === "signin" ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <h3 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Login With your Credentials</h3>
            {/* Sign In Form */}
            {activeTab === "signin" && (
              <form name="signIn" onSubmit={(e) => handelSubmit(e, 'signIn')}>
                <div className="mb-4">
                  <label
                    htmlFor="signin-email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    onChange={handelInput}
                    type="email"
                    name="email"
                    id="signin-email"
                    className="w-full mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-600"
                    placeholder="Enter your email"
                    required
                    value={input?.email}
                  />
                  {loginError?.data?.errors?.email ? <span className='text-xs  text-red-500'>{loginError?.data?.errors?.email?.msg} </span> : ''}

                </div>
                <div className="mb-4">
                  <label
                    htmlFor="signin-password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    value={input?.password}
                    name="password"
                    onChange={handelInput}
                    type="password"
                    id="signin-password"
                    className="w-full mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-600"
                    placeholder="Enter your password"
                    required
                  />
                  {loginError?.data?.errors?.password ? <span className='text-xs  text-red-500'>{loginError?.data?.errors?.password?.msg} </span> : ''}
                </div>
                {loginError?.data?.status === 401 ? <p className="text-sm pb-5 text-red-500 ">{loginError?.data?.message}</p> : ''}
                <button
                  disabled={loginIsLoading}
                  type="submit"
                  className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  {loginIsLoading ? 'Please Wait..' : 'Sign In'}
                </button>
              </form>
            )}
          </div>

          <div
            className={`transition-transform duration-1000 ease-in-out ${activeTab === "signup" ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <h3 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SignUp  With your Credentials.</h3>
            {/* Sign Up Form */}
            {activeTab === "signup" && (
              <form name="signUp" typeof="signUp" onSubmit={(e) => handelSubmit(e, 'signUp')}>
                <div className="mb-4">
                  <label
                    htmlFor="signup-username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Username
                  </label>
                  <input
                    name="userName"
                    onChange={handelInput}
                    type="text"
                    id="signup-username"
                    className="w-full mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-white dark:text-black"
                    placeholder="Enter your username"
                    required
                    value={input?.userName}
                  />
                  {registerError?.data?.errors?.userName ? <span className='text-xs  text-red-500'>{registerError?.data?.errors?.userName?.msg} </span> : ''}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="signup-email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    onChange={handelInput}
                    type="email"
                    id="signup-email"
                    className="w-full mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-600"
                    placeholder="Enter your email"
                    required
                    value={input?.email}
                  />
                  {registerError?.data?.errors?.email ? <span className='text-xs  text-red-500'>{registerError?.data?.errors?.email?.msg} </span> : ''}

                </div>
                <div className="mb-4">
                  <label
                    htmlFor="signup-password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <input

                    name="password"
                    onChange={handelInput}
                    type="password"
                    id="signup-password"
                    className="w-full mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-600"
                    placeholder="Create a password"
                    required
                    value={input?.password}
                  />
                  {registerError?.data?.errors?.password ? <span className='text-xs  text-red-500'>{registerError?.data?.errors?.password?.msg} </span> : ''}
                </div>
                <button
                  disabled={registerIsLoading}
                  type="submit"
                  className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  {registerIsLoading ? 'Please Wait ..' : 'SignUp'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>





  );
};

export default Login;



