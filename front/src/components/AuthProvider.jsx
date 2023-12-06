import { createContext, useContext, useReducer } from 'react'

const SET_TOKEN = 'SET_TOKEN'
const CLEAR_TOKEN = 'CLEAR_TOKEN'

const authReducer = (state, action) => {
    switch(action.type) {
      case SET_TOKEN:
        return {...state, token: action.payload}
      case CLEAR_TOKEN:
        return {...state, token: null}
      default:
        return state
    }
}

const initialAuthState = {
  token: null
}

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, initialAuthState)

    const setToken = (token) => {
      dispatch({type: SET_TOKEN, payload: token.access_token})
      console.log(token.access_token)
    }

    const clearToken = () => {
      dispatch({type: CLEAR_TOKEN})
    }

  return (
    <AuthContext.Provider value={{token: state.token, setToken, clearToken}}>
        {children}
    </AuthContext.Provider>
  )
}
