
import { useEffect } from 'react'
// import { useAuth } from './AuthProvider'
import { Navigate, Route, useNavigate } from 'react-router-dom'
import { getToken } from './Auth'
// import {PrivateRoute as AuthenticatedRoute} from 'react-token-auth'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {

    const isAuth = !!getToken()
    const navigate = useNavigate()

    useEffect(() => {
      if(!isAuth) {
        navigate('/login')
      }
    }, [isAuth])
    


    // const {token} = useAuth()

    // useEffect(() => {
    //   console.log(token)
    // }, [])
    

    // if(!token) {
    //   console.log('vous netes pas logg')
    //     // return <Navigate to={'/login'} />
    // }

  return children
}

export default PrivateRoute