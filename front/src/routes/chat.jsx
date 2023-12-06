import { useState } from "react"
import Message from "../components/Message"
import ChatPanel from "../components/ChatPanel"

export default function ChatBox() {

    const [history, setHistory] = useState([])
    const [message, setMessage] = useState()

    const getHistory = () => {
        fetch('')
            .then(response => response.json())
            .then(data => {
                setHistory(data)
            })
    }

    const sendMessage = () => {
        fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message})
        })
    }
    
    return (
        <>
        <div className="flex">
            <ChatPanel />
            <div className="flex flex-col h-full overflow-x-auto mb-4">
                {/* <div className="flex flex-col h-full"> */}
                    <div className="grid grid-cols-12 gap-y-2">
                        <Message message="Lorem ipsum dolor sit amet, consectetur adipisicing elit." alignLeft user="Animos"/>
                        <Message message="Vel ipsa commodi illum saepe numquam maxime asperiores voluptate sit, minima perspiciatis." alignLeft user="Animos"/>
                        <Message message="I'm ok what about you?" alignLeft user="Animos"/>
                        <Message message="Lorem ipsum dolor sit, amet consectetur adipisicing. ?" user="Henry"/>
                        <Message message="Lorem ipsum dolor sit amet !" user="Henry"/>
                        <Message message="Lorem ipsum dolor sit, amet consectetur adipisicing. ?" user="Henry"/>
                        <Message message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, in." user="Henry"/>
                        <Message message="I'm ok what about you?" alignLeft user="Animos"/>
                        <Message message="Lorem ipsum dolor sit amet !" user="Henry"/>
                        <Message message="Lorem ipsum dolor sit, amet consectetur adipisicing. ?" user="Henry"/>
                        <Message message="Lorem ipsum dolor sit amet, consectetur adipisicing elit." alignLeft user="Animos"/>
                        <Message message="Vel ipsa commodi illum saepe numquam maxime asperiores voluptate sit, minima perspiciatis." alignLeft user="Animos"/>
                        <Message message="Lorem ipsum dolor sit amet !" user="Henry"/>
                        <Message message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, in." user="Henry"/>
                        {/* {history.map((message, index) => <Message key={index} message={message.message} />)} */}
                    </div>
                    <div className="my-4 flex flex-row items-center h-16 rounded-xl w-full px-4">
                        <div className="flex-grow">
                            <div className="relative w-full">
                                <input type="text" className="flex w-full border-slate-300 rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 bg-white" onChange={e => setMessage(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        // </
    )
}