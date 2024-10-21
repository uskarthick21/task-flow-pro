import React from 'react'
import Layout from './layouts/Layout'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import AuthLayout from './layouts/AuthLayout'
import MainContainer from './components/MainContainer'
import useAuthUser from './hooks/useAuthUser'



const App = () => {

  const {user} = useAuthUser();

  return (
  
      <Routes>
        <Route path="/" element={<MainContainer />}>
          <Route 
          index
          element={<Layout><p>Home Page</p></Layout>} 
          />
        </Route>
        <Route 
        path="/register" 
        element={user ? 
        <Navigate to="/" /> : <AuthLayout><Register /></AuthLayout>} />

        <Route 
        path="/login" 
        element={user ? 
        <Navigate to="/" /> : <AuthLayout><Login /></AuthLayout>} />
      </Routes>

  )
}

export default App

