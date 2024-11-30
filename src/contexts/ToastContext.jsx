import Toast from "@/components/Toast";
import { createContext, useContext, useState } from "react";


const ToastContext = createContext()

export const useToast = () => {
  return  useContext(ToastContext)
};



const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null)

    const addToast = (message, type) => {
        setToast({ message, type })

    }


    const removeToast = () => {
        setToast(null)
    }
    return <ToastContext.Provider value={addToast} >
        {children}
        <div className="fixed bottom-5 right-5 z-50 space-y-4">
            {toast ?
                <Toast message={toast?.message} type={toast?.type} onClose={removeToast} /> : ''}
        </div>


    </ToastContext.Provider>
}


export default ToastProvider;