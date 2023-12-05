import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import Profile from './routes/profile.jsx'
import Form from './routes/new-user.jsx'
import ChatPanel from './components/ChatPanel.jsx';
import Login from './routes/login.jsx';
import ChatBox from './routes/chat.jsx';
import { AuthProvider } from './components/AuthProvider.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

// const router = createBrowserRouter([
// 	{
// 		path: "/",
// 		element: <ChatBox />
// 	},
// 	{
// 		path: "profile",
// 		element: <Profile />
// 	},
// 	{
// 		path: "new-user",
// 		element: <Form />
// 	},
// 	{
// 		path: "login",
// 		element: <Login />
// 	}
// ]);


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<Router>
					<div className="flex h-screen justify-center antialiased text-gray-800 bg-white">
						<div className="flex flex-row h-full max-w-7xl w-full overflow-x-hidden">
							<Routes>
							{/* <Login /> */}
								<Route path='/login' element={<Login />} />
								<Route path='/signup' element={<Form />} />
								{/* <Route path='/' element={<ChatBox />} /> */}
								{/* <PrivateRoute path='/' element={<ChatBox />} /> */}
								<Route path='/' element={
									<PrivateRoute>
										<ChatBox />
									</PrivateRoute>
								}
								/>
							</Routes>
						</div>
					</div>
			</Router>
		</AuthProvider>
	</React.StrictMode>
	// <React.StrictMode>
	// 	<div className="flex h-screen justify-center antialiased text-gray-800 bg-white">
    //         <div className="flex flex-row h-full max-w-7xl w-full overflow-x-hidden">
	// 			<ChatPanel />
	// 			<div className="flex flex-col flex-auto h-full p-6">
    //         		<div className="flex flex-col flex-auto flex-shrink-0 bg-gray-100 rounded-2xl h-full p-4">
	// 					<RouterProvider router={router} />
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// </React.StrictMode>,
)
