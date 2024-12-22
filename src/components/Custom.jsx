import { useLoadUserQuery } from '@/app/fetures/api/authApi'
import React from 'react'

const Custom = ({ children }) => {

    const Loading = () => {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
            </div>
        );
    };



    const { isLoading } = useLoadUserQuery()
    return <> {isLoading ? <Loading /> : <>{children}</>}</>

}

export default Custom