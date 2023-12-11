import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
// import { login } from '../components/Auth';
// import {useToken} from 'react-token-auth'


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const [token, setToken] = useToken()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    const {name, value} = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  // const {setToken} = useAuth()

  const navigate = useNavigate()
  
  const handleLogin = async (e) => {

    e.preventDefault()

    console.log(formData)


    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://back-chat-api.vercel.app/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json()
        // setToken(data)
        // login(data.access_token)
        if(data.access_token) {
          // setToken(data.access_token)
          localStorage.setItem('token', data.access_token)
          // return data.access_token
        }
        navigate('/')
        console.log('Authentification réussie !');
        // return <Navigate to={'/'} />
      } else {
        const data = await response.json();
        setError(data.message || 'Une erreur s\'est produite lors de la connexion.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      setError('Une erreur s\'est produite lors de la connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin} method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Adresse email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Mot de passe
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Se connecter
              </button>
            </div>
          {/* </div> */}
          {/* <div>
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </div> */}
          <div>
            <Link
              to={'/signup'}
              type="button"
              className="flex w-full justify-center rounded-md border-indigo-600 border-2 px-3 py-1.5 text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              // onClick={handleLogin}
              disabled={loading}
            >
              <p>
                S'incscrire
              </p>
            </Link>
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      </div>
  )
}