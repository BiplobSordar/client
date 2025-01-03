import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import ToastProvider from './contexts/ToastContext.jsx'
import Login from './pages/login.jsx'
import HeroSection from './components/HeroSection.jsx'
import MainLayout from './layout/MainLayout.jsx'
import Cources from './components/Courses.jsx'
import MyLearning from './pages/student/MyLearning.jsx'
import Profile from './pages/student/Profile.jsx'
import Sidebar from './components/AdminNav'
import AdminLayout from './layout/AdminLayout.jsx'
import Courses from './pages/admin/course/Course.jsx'
import AddCourse from './pages/admin/course/AddCourse.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import EditCourse from './pages/admin/course/EditCourse.jsx'
import CoursesPage from './pages/student/Courses.jsx'

import Lectures from './pages/admin/lecture/Lectures.jsx'
import EditLecture from './pages/admin/lecture/EditLecture.jsx'
import CourseDetails from './pages/student/CourseDetails.jsx'
import CourseProgress from './pages/student/CourseProgress.jsx'
import Search from './pages/student/Search.jsx'
import { AuthenticatedUser, ProtectedRoute, RoleWiseRoute } from './components/ProtectedRoute'
import SettingsPage from './pages/student/Settings'
import NotFoundPage from './pages/NotFound'



function App() {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element:

        <MainLayout />,
     
      children: [
        {path:'*',element:<NotFoundPage/>},
        {
          path: '/',
          element: (
            <>
              <HeroSection />
              <Cources />
            </>
          )
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path:'/settings',
          element:<ProtectedRoute>
            <SettingsPage/>
          </ProtectedRoute>
        },
        {
          path:'/courses',
          element:<CoursesPage/>
        },
        {
          path: '/my-learning',
          element: <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        },
        {
          path: '/profile',
          element: <ProtectedRoute>

            <Profile />
          </ProtectedRoute>

        },
        {
          path: '/courses/:course_id/show_details',
          element: <ProtectedRoute>
            <CourseDetails />
          </ProtectedRoute>
        },
        {
          path: '/course/search',
          element: <Search />
        },
        {
          path: '/course-progress/:course_id',
          element: <ProtectedRoute>

            <CourseProgress />
          </ProtectedRoute>
        }





      ]

    },
    // Admin Route Begin 
    {
      path: '/admin',
      element: 

        <AdminLayout />,
      
      children: [
        {
          path: '/admin',
          element: (
            <>
              <HeroSection />
              <Cources />
            </>
          )
        },
        {path:'*',element:<NotFoundPage/>},
        { path: '/admin/dashboard', element: <Dashboard /> },
        {path:'/admin/profile',element:<Profile/>},

        {
          path: '/admin/courses',
          element: <Courses />
        },
        {
          path: '/admin/courses/create_course',
          element: <AddCourse />
        },
        {
          path: '/admin/courses/:id',
          element: <EditCourse />
        },
        { path: '/admin/courses/:course_id/lecture', element: <Lectures /> },
        { path: '/admin/courses/:course_id/lecture/:lecture_id', element: <EditLecture /> },
        {
          path: '/admin/course/search',
          element: <Search />
        },
        {
          path:'/admin/settings',
          element:<SettingsPage/>
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
