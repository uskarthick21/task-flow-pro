import React from 'react'
import Layout from './layouts/Layout'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import AuthLayout from './layouts/AuthLayout'
import MainContainer from './components/MainContainer'
import { useQuery } from '@tanstack/react-query'
import { cookieCheck } from './config/api'



const App = () => {

  const {data} = useQuery({
    queryKey: [cookieCheck],
    queryFn: cookieCheck
  });

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
        element={data ? 
        <Navigate to="/" /> : <AuthLayout><Register /></AuthLayout>} />

        <Route 
        path="/login" 
        element={data ? 
        <Navigate to="/" /> : <AuthLayout><Login /></AuthLayout>} />
      </Routes>

  )
}

export default App

