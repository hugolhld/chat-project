
import { useAuth } from './AuthProvider'
import { Navigate, Route } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {

    const {user} = useAuth()

    if(!user) {
        return <Navigate to={'/login'} />
    }

  return children
}

export default PrivateRoute