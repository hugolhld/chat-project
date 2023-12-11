import { useState } from "react"
import { getToken } from "../components/Auth"
import { useNavigate } from "react-router-dom"

export default function Profile({closeProfile, user}) {

    const [newInfo, setNewInfo] = useState({
        first_name: '',
        last_name: '',
        mail: '',
        password: '',
    })

    const navigate = useNavigate()

    const [message, setMessage] = useState('')

    const handleUpdate = async (fieldName) => {
        try{
            const response = await fetch(`https://back-chat-api.vercel.app/update_user_info/${fieldName}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ [fieldName]: newInfo[fieldName] }),
            })

            if(response.ok) {
                const data = await response.json()
                console.log('mis a jour')
                setMessage(`Le ${fieldName} a été mis à jour`)
            } else {
                setMessage('erreur pas mis a jour')
            }
        } catch (err) {
            console.log(err)
            setMessage('erreur pas mis a jour')
        }
    }

    const handleInputChange = (fieldName, value) => {
        setNewInfo((prevUserInfo) => ({
          ...prevUserInfo,
          [fieldName]: value,
        }))
      }

    const deleteAccount = async () => {
        try {

            const response = await fetch('https://back-chat-api.vercel.app/delete_account', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
            })


            if (response.ok) {
                navigate('/login')
            } else {
                setMessage('Une erreur s\'est produite');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du compte utilisateur :', error.message);
            setMessage('Une erreur s\'est produite');
        }
    };
    

    return (
        <>
            <div className="absolute z-10 bg-transparent backdrop-blur-sm w-full top-0 left-0 flex items-center justify-center h-full">
                <div className="space-y-12 w-3/5 p-5 rounded-2xl bg-white border">
                    <div>
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Profil
                            </h2>
                        </div>
                        <div className="mt-10 gap-x-6 gap-y-5 sm:grid-cols-4">
                            {message != '' && 
                            
                                    <div className="py-4 px-4 my-4 border border-green-500 rounded-md">
                                        {message}
                                    </div>
                            
                            }
                            <div className="sm:col-span-2">
                                <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Prénom
                                </label>
                                <div className="mt-2 flex w-full">
                                    <div className="flex w-4/5 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md px-3 bg-white">
                                        <input
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            placeholder={user.first_name}
                                            onChange={e => handleInputChange('first_name', e.target.value)}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <button onClick={() => handleUpdate('first_name')} className="mx-2 px-3 bg-indigo-600 text-white">
                                        Modifier
                                    </button>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nom
                                </label>
                                <div className="mt-2 flex">
                                    <div className="flex w-4/5 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md px-3 bg-white">
                                        <input
                                            type="text"
                                            name="last_name"
                                            id="last_name"
                                            placeholder={user.last_name}
                                            onChange={e => handleInputChange('last_name', e.target.value)}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <button onClick={() => handleUpdate('last_name')} className="mx-2 px-3 bg-indigo-600 text-white">
                                        Modifier
                                    </button>
                                </div>

                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2 flex">
                                    <div className="flex w-4/5 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md px-3 bg-white">
                                        <input
                                            type="email"
                                            name="mail"
                                            id="email"
                                            placeholder={user.mail}
                                            onChange={e => handleInputChange('mail', e.target.value)}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <button onClick={() => handleUpdate('mail')} className="mx-2 px-3 bg-indigo-600 text-white">
                                        Modifier
                                    </button>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Mot de passe
                                </label>
                                <div className="mt-2 flex">
                                    <div className="flex w-4/5 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md px-3 bg-white">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            onChange={e => handleInputChange('password', e.target.value)}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <button onClick={() => handleUpdate('password')} className="mx-2 px-3 bg-indigo-600 text-white">
                                        Modifier
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 w-full flex justify-between items-center gap-x-6 sm:col-span-3">
                                <button type="button" onClick={deleteAccount} className="text-sm font-semibold leading-6 bg-red-600 px-3 py-2 text-white">
                                    Supprimer son compte
                                </button>
                                <button type="button" onClick={closeProfile} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Ok
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
