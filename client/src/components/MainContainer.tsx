import useAuthUser from '../hooks/useAuthUser';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

const MainContainer = () => {
  const { user, isLoading } = useAuthUser();
  const location = useLocation();  // Detect route changes

  // // Detect route changes with useLocation (including browser back/forward)
  // useEffect(() => {
  //   alert(`Route changed to: ${location.pathname}`);
  //   console.log(`Route changed to: ${location.pathname}`);
  // }, [location]); // This will trigger whenever the URL changes (back/forward or internal navigation)

  return isLoading ? (
    <div>Loading...</div>
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate 
      to="/login" 
      replace 
      state={{ redirectUrl: window.location.pathname }} 
    />
  );
};

export default MainContainer;
