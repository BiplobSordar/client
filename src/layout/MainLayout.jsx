import Navbar from '@/components/Navbar'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const MainLayout = () => {
    const navigate=useNavigate()
    const { user, isAuthenticated } = useSelector(store => store.auth);
         useEffect(()=>{
            
            if(user&& user.role!='student'){
                navigate('/admin')
            }
            
         },[])
    return (
        <div>
            <Navbar />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout;