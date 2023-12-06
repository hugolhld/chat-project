
import { useEffect } from 'react'
import { useAuth } from './AuthProvider'
import { Navigate, Route } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {

    const {token} = useAuth()

    useEffect(() => {
      console.log(token)
    }, [])
    

    if(!token) {
      console.log('vous netes pas logg')
        // return <Navigate to={'/login'} />
    }

  return children
}

export default PrivateRoute