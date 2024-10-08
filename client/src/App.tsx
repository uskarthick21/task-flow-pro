import React from 'react'

import Layout from './layouts/Layout'
import { Navigate, Route, Routes } from 'react-router-dom'


const App = () => {
  return (
  
      <Routes>
        <Route path="/" element={<Layout><p>Home Page</p></Layout>} />
        <Route path="/search" element={<>Search Page</>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

  )
}

export default App

