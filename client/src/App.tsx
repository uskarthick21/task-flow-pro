import React from 'react'

import Layout from './layouts/Layout'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import AuthLayout from './layouts/AuthLayout'


const App = () => {
  return (
  
      <Routes>
        <Route 
        path="/" 
        element={<Layout><p>Home Page</p></Layout>} 
        />
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

