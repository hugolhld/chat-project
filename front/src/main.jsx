import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Profile from './routes/profile.jsx'
import Form from './routes/new-user.jsx'
import ChatPanel from './components/ChatPanel.jsx';
import Login from './routes/login.jsx';
import ChatBox from './routes/chat.jsx';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />
	},
	{
		path: "chat",
		element: <ChatBox />
	},
	{
		path: "profile",
		element: <Profile />
	},
	{
		path: "new-user",
		element: <Form />
	},
	{
		path: "login",
		element: <Login />
	}
]);


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<div className="flex h-screen justify-center antialiased text-gray-800 bg-white">
            <div className="flex flex-row h-full max-w-7xl w-full overflow-x-hidden">
				<ChatPanel />
				<RouterProvider router={router} />
			</div>
		</div>
	</React.StrictMode>,
)
