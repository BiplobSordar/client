import AdminNav from '@/components/AdminNav'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
    <AdminNav/>
    <Outlet/>
    </>
  )
}

export default AdminLayout