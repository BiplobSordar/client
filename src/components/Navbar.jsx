// src/Navbar.jsx

import React, { useEffect, useState } from 'react';
import { AiOutlineHome, AiOutlineBook, AiOutlineMenu, AiOutlineClose, AiOutlineBulb } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import defaultUserImage from '../assets/user.png'
import { authApi, useLogoutUserMutation } from '@/app/fetures/api/authApi';
import { useToast } from '@/contexts/ToastContext';

const Navbar = () => {
    const dispatch=useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [logoutUser, { data, error, isLoading, isSuccess, isError }] = useLogoutUserMutation()

    const toggleDropdown = () => setIsOpen(!isOpen);
    const toggleDarkMode = () => setDarkMode(!darkMode);
    const { user } = useSelector((store) => store.auth)
    const addToast = useToast()
    const handelLogout = async () => {
        await logoutUser()
        
        dispatch(authApi.util.resetApiState())
    }
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    useEffect(() => {
        if (isSuccess) {
            addToast('User LoggedOut Successfully', 'success')
            navigate('/login')
        }
        if (isError) {
            addToast('Something Wrong', 'error')
        }
    }, [isError, isSuccess])



    return (
        <nav className={`p-4 ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-md border-b border-gray-200 transition duration-500`}>
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center cursor-pointer">
                    <AiOutlineBook className="text-3xl text-blue-500" />
                    <span onClick={()=>navigate('/')} className={`ml-2 text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>E-Learning</span>
                </div>
                <div className="hidden  md:flex space-x-6 items-center">
                    <button onClick={() => navigate('/')} className={`text-xl hover:text-blue-500 ${darkMode ? 'text-white' : 'text-gray-900'} transition duration-300`}>
                        <AiOutlineHome className="inline-block mr-1" /> Home
                    </button>
                    < button onClick={() => navigate('/courses')} className={`text-xl hover:text-blue-500 ${darkMode ? 'text-white' : 'text-gray-900'} transition duration-300`}>
                        Courses
                    </button>
                    < button onClick={() => navigate('/my-learning')} className={`text-xl hover:text-blue-500 ${darkMode ? 'text-white' : 'text-gray-900'} transition duration-300`}>
                      MyLearning
                    </button>

                    {user ? <div className="relative">
                        <button onClick={toggleDropdown} className={`text-xl flex items-center hover:text-blue-500 ${darkMode ? 'text-white' : 'text-gray-900'} transition duration-300`}>
                            <img src={user?.photo_url || defaultUserImage} alt="Profile" className="w-8 h-8 rounded-full inline-block mr-1" />
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                                <button onClick={() => navigate('/profile')} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300">My Profile</button>
                                <button onClick={() => navigate('/settings')} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300">Settings</button>
                                <button onClick={handelLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300">Logout</button>
                            </div>
                        )}
                    </div> :
                        <div className="space-x-4 ">

                            <button onClick={() => navigate('/login')} className="px-4 py-1 bg-slate-100 text-gray-900 rounded-lg hover:bg-slate-200 transition duration-300" > Sign In </button>


                            <button onClick={() => navigate('/login')} className="px-4 py-1 bg-slate-100 text-gray-900 rounded-lg hover:bg-slate-200 transition duration-300" > Sign Up </button>


                        </div>}

                    <button onClick={toggleDarkMode} className={`text-2xl ${darkMode ? 'text-yellow-400' : 'text-gray-900'} transition duration-300`}>
                        <AiOutlineBulb />
                    </button>
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={toggleDropdown} className={`text-3xl ${darkMode ? 'text-white' : 'text-gray-900'} transition duration-300`}>
                        {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                    </button>
                </div>
            </div>


            <div className={`z-10  ${darkMode ? 'bg-gray-900' : 'bg-white'} h-screen absolute top-16  left-0 transform translate ease-in-out duration-500 ${isOpen ? 'translate-x-0 ' : '-translate-x-full'}  w-full  md:hidden   `}>
                <button onClick={() => navigate('/')} className={`block px-4 py-2 ${darkMode ? 'text-white' : 'text-gray-900'} hover:bg-gray-200 transition duration-300`}>
                    Home
                </button>
                <button onClick={() => navigate('/courses')} className={`block px-4 py-2 ${darkMode ? 'text-white' : 'text-gray-900'} hover:bg-gray-200 transition duration-300`}>
                    Courses
                </button>
                <button onClick={() => navigate('/profile')} className={`block px-4 py-2 ${darkMode ? 'text-white' : 'text-gray-900'} hover:bg-gray-200 transition duration-300`}>
                    Profile
                </button>
                <button onClick={toggleDarkMode} className={`block w-full text-left px-4 py-2 ${darkMode ? 'text-yellow-400' : 'text-gray-900'} hover:bg-gray-200 transition duration-300`}>
                    <AiOutlineBulb className="inline-block mr-1" /> Dark Mode
                </button>
            </div>


        </nav>
    );
};

export default Navbar;
