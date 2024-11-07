import React from 'react'

import Layout from './layouts/Layout'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import AuthLayout from './layouts/AuthLayout'
import MainContainer from './components/MainContainer'
import Task from './components/Task'
import { setNavigate } from './config/navigation'


const App = () => {
  
  const navigate = useNavigate();
  setNavigate(navigate);

  return (
  
      <Routes>
        <Route  path="/"  element={<MainContainer />}>
          <Route 
          index
          element={<Layout><p>Home</p></Layout>} 
          />
          <Route 
          path="/task"
          element={<Layout><Task /></Layout>} 
          />
        </Route>
        <Route 
        path="/register" 
        element={<AuthLayout><Register /></AuthLayout>} 
        />
         <Route 
        path="/login" 
        element={<AuthLayout><Login /></AuthLayout>} 
        />
      </Routes>

  )
}

export default App

