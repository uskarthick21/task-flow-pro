import useAuthUser from '../hooks/useAuthUser';
import { Navigate, Outlet } from 'react-router-dom';

const MainContainer = () => {
  const { user, isLoading } = useAuthUser();
  
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
