import './App.css'
import ToastProvider from './contexts/ToastContext'
import Login from './pages/login'


function App() {


  return (
    <>
      <ToastProvider>
        <Login />
      </ToastProvider>
    </>
  )
}

export default App
