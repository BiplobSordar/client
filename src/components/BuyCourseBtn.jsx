import { useCreateCheckOutSessionMutation } from '@/app/fetures/api/purchaseApi'
import { useToast } from '@/contexts/ToastContext';
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const BuyCourseBtn = ( props ) => {
    const addToast=useToast()
    console.log(props.status,'this is the status')
    console.log(props.courseId,'this is the courseID')
    const navigate = useNavigate();


   
   
    const [createCheckOutSession, { data: createCheckOutSessionData, error: createCheckOutSessionError, isLoading: createCheckOutSessionIsLoading, isSuccess: createCheckOutSessionIsSuccess, isError: createCheckOutSessionIsError }] = useCreateCheckOutSessionMutation()

    useEffect(() => {
        if (createCheckOutSessionIsSuccess) {
            if (createCheckOutSessionData?.url) {
                window.location.href = createCheckOutSessionData.url; // Redirect to stripe checkout url
            } else {
                addToast("Invalid response from server.", 'error')
            }
        }
        if (createCheckOutSessionIsError) {
            addToast(createCheckOutSessionError?.data?.message || "Failed to create checkout session", 'error')
        }
    }, [createCheckOutSessionData, createCheckOutSessionIsSuccess, createCheckOutSessionIsError, createCheckOutSessionError])


    const handleContinueCourse = () => {
        console.log(props.status,'this is the status inside handleContinueCourse')
        if (props.status==='complete') {
          navigate(`/course-progress/${props.courseId}`);
        }
    };

    const handleCheckout = async () => {
console.log('i am clicked at handleCheckout')
        await createCheckOutSession(props.courseId)
    }
    console.log(createCheckOutSessionData, 'thsi is the data')
    console.log(createCheckOutSessionError, 'thsi is the error')

    return (<>
        {props.status? (
            <button
                onClick={handleContinueCourse}
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
            >
                Continue Course
            </button>
        ) : (
            <button
                className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700"
                onClick={handleCheckout}
            >
                {createCheckOutSessionIsLoading ? 'Processing...' : 'Buy Now'}
            </button>
        )}
    </>
    )
}

export default BuyCourseBtn