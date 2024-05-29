import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AllUser from './pages/AllUser'
import Validation from './pages/Validation'
function App() {
  const [userData, setUserData] = useState(null)

  const router = createBrowserRouter([
    {path: '', element:<Home userData={userData} setUserData={setUserData}/>},
    {path: '/register', element:<Register userData={userData} setUserData={setUserData}/>},
    {path: '/login', element:<Login userData={userData} setUserData={setUserData}/>},
    {path: '/all_users', element:<AllUser userData={userData} setUserData={setUserData}/>},
    {path: '/validation', element:<Validation/>}
  
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
