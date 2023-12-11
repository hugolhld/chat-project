import { Link, useNavigate } from "react-router-dom"
import Conversation from "./Conversation"
import { useEffect, useState } from "react"
import { getToken, logout } from "./Auth"
import Profile from "../routes/profile"

export default function ChatPanel({setConv, usersList, convHistory, user, inputRef}) {

    // const [usersList, setUsersList] = useState([])

    const navigate = useNavigate()

    const [contactData, setContactData] = useState([])

    const [convData, setConvData] = useState([])

    const [openProfile, setOpenProfile] = useState(false)

    useEffect(() => {
      setContactData([])
      setContactData(usersList)
    }, [usersList])

    useEffect(() => {
      setConvData([])
      setConvData(convHistory)
    }, [convHistory])
    
    const logoutApp = () => {
        logout()
        navigate('/login')
    }

    const handleClick = (id) => {
        if(inputRef.current) {
            inputRef.current.value = ''
        }
        setConv(id)
    }
    
    

    return (
        <div className="flex flex-col py-8 px-6 shadow w-64 bg-white flex-shrink-0 overflow-y-auto">
            <div className="flex flex-row items-center justify-center  w-full">
                <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                </div>
                <div className="ml-2 font-bold text-2xl">QuickChat</div>
            </div>
            
            <button onClick={() => setOpenProfile(true)} className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
                <div className="h-20 w-20 uppercase rounded-full border flex justify-center items-center bg-indigo-500 text-3xl overflow-hidden">
                    {user.first_name.charAt(0)}
                </div>
                <div className="text-sm font-semibold capitalize mt-2">{user.first_name}</div>
            </button>

            {openProfile && <Profile closeProfile={() => setOpenProfile(false)} user={user}/>}
            
            <div className="flex flex-col mt-8">
                {/* {user ? */}
                    <>
                        <div className="flex flex-row items-center justify-between text-xs">
                            <span className="font-bold">Conversations Actives</span>
                            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">{convHistory.length}</span>
                        </div>
                        <div className="flex flex-col space-y-1 mt-4 -mx-2">
                            <Conversation name="Henry Boyd" />
                            {
                                convData.length > 0 && convData.map((contact, index) => {
                                    if(contact != undefined) {
                                        return <Conversation key={index} name={`${contact.first_name} ${contact.last_name}`} handleClick={() => setConv(contact.id)} />
                                    }
                                })
                            }
                        </div>
                    </>
                {/* : null} */}
                <div className="flex flex-row items-center justify-between text-xs mt-6">
                    <span className="font-bold">Utilisateurs</span>
                    <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">{usersList.length}</span>
                </div>
                <div className="flex flex-col space-y-1 mt-4 -mx-2">
                    <Conversation name="Henry Boyd" />
                    {
                        usersList.length > 0 && usersList.map((user, index) => {

                            return <Conversation key={index} handleClick={() => handleClick(user.id)} name={`${user.first_name} ${user.last_name}`} />
                    
                    })
                    }
                </div>
            </div>
            <button onClick={logoutApp} className="my-6 py-2 bg-red-600 text-white font-bold hover:scale-90 transition-transform">
                Se déconnecter
            </button>
        </div>
    )
}