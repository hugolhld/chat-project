import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import './index.css'
import Profile from './routes/profile.jsx'
import Form from './routes/new-user.jsx'
import ChatPanel from './components/ChatPanel.jsx';
import Login from './routes/login.jsx';
import ChatBox from './routes/chat.jsx';
import Signup from './routes/signup.jsx';

const router = createBrowserRouter([
	{
		path: "/",
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
	},
	{
		path: "signup",
		element: <Signup />
	}
]);


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<div className="flex h-screen justify-center antialiased text-gray-800 bg-white">
            <div className="flex flex-row h-full max-w-7xl w-full overflow-x-hidden">
				<ChatPanel />
				<div className="flex flex-col flex-auto h-full p-6">
            		<div className="flex flex-col flex-auto flex-shrink-0 bg-slate-50 rounded-2xl h-full p-4">
						<RouterProvider router={router} />
					</div>
				</div>
			</div>
		</div>
	</React.StrictMode>,
)
