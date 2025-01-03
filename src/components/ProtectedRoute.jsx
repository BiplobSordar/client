
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useSelector(store => store.auth)


    if (!isAuthenticated) {
        return <Navigate to={'/login'} />
    }

    return children
}

export const AuthenticatedUser = ({ children }) => {
    const { isAuthenticated } = useSelector(store => store.auth)


    if (isAuthenticated) {
        return <Navigate to={'/'} />
    }
    return children
}
export const RoleWiseRoute = ({ children }) => {
    const { user, isAuthenticated } = useSelector(store => store.auth);
    console.log(user,'thsi is the user from RoleWiseRoute')
    console.log(isAuthenticated,'thsi is the isAuthenticated status from RoleWiseRoute')

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    if (user?.role != "instructor") {
        return <Navigate to="/" />
    }
    if (user?.role != "student") {
        return <Navigate to="/admin" />
    }

    return children;
}