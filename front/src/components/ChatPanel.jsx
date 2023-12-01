import Conversation from "./Conversation"

export default function ChatPanel() {

    const user = null

    return (
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
                <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                </div>
                <div className="ml-2 font-bold text-2xl">QuickChat</div>
            </div>
            
            {user ?
                <a href="/profile" className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
                    <div className="h-20 w-20 rounded-full border flex justify-center items-center bg-indigo-500 text-3xl overflow-hidden">
                        A
                    </div>
                    <div className="text-sm font-semibold mt-2">Aminos</div>
                </a>
            : null
            }
            
            <div className="flex flex-col mt-8">
                {user ?
                    <>
                        <div className="flex flex-row items-center justify-between text-xs">
                            <span className="font-bold">Conversations Actives</span>
                            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">4</span>
                        </div>
                        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                            <Conversation name="Henry Boyd" />
                        </div>
                    </>
                : null}
                <div className="flex flex-row items-center justify-between text-xs mt-6">
                    <span className="font-bold">Utilisateurs</span>
                    <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">7</span>
                </div>
                <div className="flex flex-col space-y-1 mt-4 -mx-2">
                    <Conversation name="Henry Boyd" />
                </div>
            </div>
        </div>
    )
}