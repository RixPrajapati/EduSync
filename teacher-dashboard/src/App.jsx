import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import TeacherDashboard from './components/TeacherDashboard'
import ForgetPassword from './components/ForgetPassword'
import { Route, Router, Routes } from 'react-router-dom'
import ResetPassword from './components/ResetPassword'

function App() {
  

  return (
    <>
  <Routes>
    <Route path='/teacher-dashboard' element={<TeacherDashboard/>}> 
    </Route>
    <Route path='/forgetpassword' element={<ForgetPassword/>}/>
     <Route path='/reset-password' element={<ResetPassword/>}/>
  </Routes>

    </>
  )
}

export default App
