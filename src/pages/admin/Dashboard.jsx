import { useGetPurchasedCoursesQuery } from '@/app/fetures/api/purchaseApi'
import Loading from '@/components/Loading'
import SellCourseChart from '@/components/SellCourseChart.jsx'
import React, { useEffect } from 'react'

const Dashboard = () => {

  const { data, isLoading, error ,refetch} = useGetPurchasedCoursesQuery()
  console.log(data,'thsi is the Dashboard data')
  useEffect(()=>{
    refetch()
  },[])

  if(isLoading)return <Loading/>
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-10  w-full">
      {/* <!-- Total Sales Card --> */}
      <div className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg p-4">
        <div className="border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Total Sales</h2>
        </div>
        <div>
          <p className="text-3xl font-bold text-blue-600">{data?.result?.total_sales}</p>
        </div>
      </div>

      {/* <!-- Total Revenue Card --> */}
      <div className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg p-4">
        <div className="border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Total Revenue</h2>
        </div>
        <div>
          <p className="text-3xl font-bold text-blue-600">{data?.result?.total_revenue}$</p>
        </div>
      </div>


    </div>

  )
}

export default Dashboard