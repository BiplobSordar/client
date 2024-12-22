import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import ToastProvider from './contexts/ToastContext'
import Login from './pages/login'
import HeroSection from './components/HeroSection'
import MainLayout from './layout/MainLayout'
import Cources from './components/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import Sidebar from './components/AdminNav'
import AdminLayout from './layout/AdminLayout'
import Courses from './pages/admin/course/Course'
import AddCourse from './pages/admin/course/AddCourse'
import Dashboard from './pages/admin/Dashboard'
import EditCourse from './pages/admin/course/EditCourse'


function App() {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: (
            <>
              <HeroSection />
              <Cources/>
            </>
          )
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path:'/my-learning',
          element:<MyLearning/>
        },
        {
          path:'/profile',
          element:<Profile/>
        },



      
       
      ]
     
    },
      // Admin Route Begin 
    {
      path:'/admin',
      element:<AdminLayout/>,
      children:[
        {path:'/admin/dashboard',element:<Dashboard/>},
        {path:'/admin/courses',
          element:<Courses/>
        },
        {
          path:'/admin/courses/create_course',
          element:<AddCourse/>
        },
        {
          path:'/admin/courses/:id',
          element:<EditCourse/>
        }
      ]
    }
  ])


  return (
    <>
      <ToastProvider>
        <RouterProvider router={appRouter} />
      </ToastProvider>
    </>
  )
}

export default App
