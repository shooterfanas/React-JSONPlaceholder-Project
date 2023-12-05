import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({children}) => {

  const {isLoggedIn} = useAuth();

  const location = useLocation();
  if(!isLoggedIn){
    return <Navigate to='/auth/login' replace={true} state={{
      return_url: location.pathname
    }}/>
  }
  return children
}

export default PrivateRoute