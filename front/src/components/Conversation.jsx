export default function Conversation({name}) {

    return (
        <a href="/chat" className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
            <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">{name[0]}</div>
            <div className="ml-2 text-sm font-semibold">{name}</div>
        </a>
    )
}