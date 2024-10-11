import React from 'react'

import Layout from './layouts/Layout'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'


const App = () => {
  return (
  
      <Routes>
        <Route 
        path="/" 
        element={<Layout><p>Home Page</p></Layout>} 
        />
        <Route 
        path="/search" 
        element={<Layout><p>Search Page</p></Layout>}
         />
        <Route 
        path="/register" 
        element={<Layout><Register /></Layout>} 
        />
        <Route 
        path="*" 
        element={<Navigate to="/" />} 
        />
      </Routes>

  )
}

export default App

