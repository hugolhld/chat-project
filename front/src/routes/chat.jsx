import { useEffect, useRef, useState } from "react"
import Message from "../components/Message"
import ChatPanel from "../components/ChatPanel"
import { getToken, logout } from "../components/Auth"
import { useNavigate } from "react-router-dom"

export default function ChatBox() {

    const [user, setUser] = useState(null)

    const [history, setHistory] = useState([])
    const [message, setMessage] = useState()

    const [allUsers, setAllUsers] = useState([])

    const [usersHistory, setUsersHistory] = useState(null)
    const [contactHistory, setContactHistory] = useState([])

    const [convWith, setConvWith] = useState(null)

    const [messagesHistory, setMessagesHistory] = useState([])

    const [messageData, setMessageData] = useState({
        idTo: '',
        // idFrom: '',
        content: ''
    })

    const navigate = useNavigate()

    const inputRef = useRef()
    const messageBoxRef = useRef()

    const getProfile = async () => {
        try {
            const response = await fetch('https://back-chat-api.vercel.app/get_user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                }
            })

            if(response.ok) {
                const data = await response.json()
                setUser(data)
            } else {
                console.log('utilisateur introuvable')
            }

        } catch (error) {
            console.log(error)
        }
    }

    const getUsers = async () => {
        try {

            const token = getToken()

            const repsonse = await fetch('https://back-chat-api.vercel.app/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })

            if(repsonse.ok) {
                setAllUsers([])
                const data = await repsonse.json()
                setAllUsers(data)
                // data.map(user => setAllUsers(prev => [...prev, user]))
                // setUsersList(prev => [...prev, data])
                // allUsers.map(user => console.log(user))


            } else if(repsonse.status == 401){
                logout()
                navigate('/login')
            } else {
                console.error('Erreur lors de la requête :', repsonse.statusText);
            }

        } catch (error) {
            console.error('Erreur lors de la requête :', error.message);
        }

    }


    const getHistory = async () => {
        try {
            const response = await fetch('https://back-chat-api.vercel.app/contactsHistory', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
                }
            })

            if(response.ok) {
                const data = await response.json()
                setUsersHistory(data)
            }

        } catch(err) {
            console.log(err)
        }
    }

    const sendMessage = async (e) => {
        e.preventDefault()
        // setMessageData({...messageData, content: e.target.value})
        try{
            const response = await fetch('https://back-chat-api.vercel.app/sendMsg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
                },
                body: JSON.stringify(messageData)
            })

            if(response.ok) {
                console.log('message send')

                inputRef.current.value = ''

                let found = false

                for(const user of contactHistory) {

                    if(user != undefined) {
                        if(user.id == messageData.idTo) {
                            found = true
                            console.log('its found contact')
                        }
                    }
                }

                if(!found) {
                    setContactHistory(prev => [...prev, allUsers[messageData.idTo - 1]])
                }
                const dateTemp = new Date()
                // messagesHistory.push(messageData)
                if(messagesHistory.length > 0) {
                    setMessagesHistory(prev => [...prev, {content: messageData.content, idTo: messageData.idTo - 1, timstamp: (dateTemp.getTime() / 1000)} ])
                } else {
                    setMessagesHistory([{content: messageData.content, idTo: messageData.idTo - 1, timstamp: (dateTemp.getTime() / 1000)}])
                }

                if(messageBoxRef.current) {
                    messageBoxRef.current.scrollTo(0, messageBoxRef.current.scrollHeight * 2)
                    // messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight - messageBoxRef.current.offsetHeight
                }

            } else {
                console.log('error send')
            }
        } catch (err) {
            console.log(err)
        }

    }

    const loadMessages = async (userId) => {
        setConvWith(userId)
        try {
            const response = await fetch('https://back-chat-api.vercel.app/messages/' + userId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
                }
            })

            if(response.ok) {
                const data = await response.json()
                setMessagesHistory(data)
            } else {
                console.log('error with loading message or no message found')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(getToken() != null) {
            getProfile()
            getUsers()
            getHistory()
        } else {
            navigate('/login')
        }
    }, [])


    useEffect(() => {
    //   usersHistory.map(user => console.log(user))
    // console.log(usersHistory)
    if(usersHistory != undefined && allUsers.length > 0) {
        setContactHistory([])
        for(const user of usersHistory) {
            setContactHistory(prev => [...prev, allUsers[user.idTo - 1]])
        }

        // console.log(contactHistory)
    }
    }, [usersHistory, allUsers])
    
    

    useEffect(() => {
      setMessageData({idTo: convWith})
    }, [convWith])
    useEffect(() => {
    //   setMessageData({idTo: convWith})
      setMessageData({...messageData, content: message})
    }, [message])

    // const getFirstName = async () => {
    //     try {
    //         const response = await fetch('')
    //     }
    // }
    
    
    return (
        <div className="flex w-full">
            {allUsers.length > 0 & user != undefined /* & contactHistory.length > 0 */ && <ChatPanel user={user} usersList={allUsers} setConv={loadMessages} convHistory={contactHistory} inputRef={inputRef} />}
            <div className="w-full flex flex-col h-full overflow-x-auto mb-4 relative">
                {/* <div className="flex flex-col h-full"> */}

                    {
                        convWith !== null ?
                        
                            <>
                                <div ref={messageBoxRef} className="flex flex-col gap-y-2 h-[90vh] overflow-y-auto">

                                    {
                                        messagesHistory.length > 0 & user != null ?

                                        // const otherUser = allUsers[message.idTo - 1]
                                        messagesHistory.map((message, index) => {
                                            // console.log(allUsers[message.idTo].first_name)
                                            // console.log(otherUser)
                                            return <Message 
                                                        key={index}
                                                        message={message.content}
                                                        timestamp={message.timstamp}
                                                        alignLeft={message.idTo == user.id ? true : false}
                                                        user={user.first_name}
                                                        // user={message.idTo != user.id ? user.first_name : allUsers[message.idTo - 1].first_name}
                                                    />

                                        })

                                        :

                                        <div className="flex justify-center items-center h-full">
                                            Faites le premier pas, dites <span className="font-bold"> Bonjour !</span>
                                        </div>

                                    }

                                </div>
                                <div className=" bottom-0 left-0 my-4 flex flex-row items-center h-16 rounded-xl w-full px-4">
                                    <div className="flex-grow">
                                        <form className="relative w-full flex" onSubmit={e => sendMessage(e)}>
                                            <input ref={inputRef} type="text" onChange={e => setMessage(e.target.value)} className="flex w-full border-slate-300 rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 bg-white" />
                                            <button type="submit" className="mx-2 px-2">Send</button>
                                        </form>
                                    </div>
                                </div>
                            </>

                        :
                            <div className="flex justify-center items-center h-full">
                                <h1 className="font-bold">Démarrez une conversation avec un des utilisateurs</h1>
                            </div>

                    }
                </div>
            </div>
    )
}