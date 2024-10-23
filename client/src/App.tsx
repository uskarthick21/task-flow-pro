import React from 'react'

import Layout from './layouts/Layout'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import AuthLayout from './layouts/AuthLayout'
import MainContainer from './components/MainContainer'
import Task from './components/Task'


const App = () => {
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

