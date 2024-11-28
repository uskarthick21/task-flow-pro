import Layout from './layouts/Layout'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import AuthLayout from './layouts/AuthLayout'
import MainContainer from './components/MainContainer'
import { setNavigate } from './config/navigation'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Task from './pages/Task'
import TaskForm from './components/TaskForm'
import NoPageFound from './components/NoPageFound'


const App = () => {
  
  const navigate = useNavigate();
  setNavigate(navigate);

  const { loading } = useAuth(); // Access loading from AuthContext

  if (loading) {
    // Show a loading spinner or fallback while authentication status is being determined
    return <div>Loading...</div>;
  }

  return (
      <Routes>
        {/* Protected routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <MainContainer />
            </ProtectedRoute>
          }
        >
          <Route index element={<Layout><p>Home</p></Layout>} />
          <Route path="/task" element={<Layout><Task /></Layout>} />
          <Route path="/task/add" element={<Layout><TaskForm /></Layout>} />
        </Route>

        {/* Public routes */}
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
  )
}

export default App

