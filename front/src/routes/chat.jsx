import ChatPanel from "../components/ChatPanel";
import ChatBox from "../components/ChatBox";

export default function Chat() {
    
    return (
        <div className="flex h-screen justify-center antialiased text-gray-800 bg-white">
            <div className="flex flex-row h-full max-w-7xl w-full overflow-x-hidden">
                <ChatPanel />
                <ChatBox />
            </div>
        </div>
    )
}