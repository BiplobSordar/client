import AdminNav from '@/components/AdminNav'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminLayout = () => {

  const navigate = useNavigate()
  const { user, isAuthenticated } = useSelector(store => store.auth);
  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login')
    }
    if (user && user.role != 'instructor' || null) {
      navigate('/')
    }
  }, [])

  return (
    <>
      <AdminNav />
      <Outlet />
    </>
  )
}

export default AdminLayout