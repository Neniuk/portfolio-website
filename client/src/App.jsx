import MyProfile from "./components/Profile";
import MyProjects from "./components/Projects";
import MyChat from "./components/Chat";
import { io } from "socket.io-client";
import React from "react";

const socket = io("http://localhost:8080");

function App() {
	// State for number of connected users
	const [connectedUsers, setConnectedUsers] = React.useState(0);
	const [messages, setMessages] = React.useState([]);

	const handleConnectError = React.useCallback(() => {
		if (!socket.connected) {
			setTimeout(() => socket.connect(), 8080);
		}
	}, []);

	React.useEffect(() => {
		socket.on("connect", () => {
			console.log("Connected to server");
		});

		socket.on("connect_error", handleConnectError);

		socket.on("disconnect", (reason) => {
			console.log("Disconnected from server");

			if (reason === "io server disconnect") {
				// the disconnection was initiated by the server, you need to reconnect manually
				socket.connect();
			}
		});

		socket.on("users", (numUsers) => {
			setConnectedUsers(numUsers);
		});

		socket.on("chat", (message) => {
			// console.log("Message received: " + message);

			setMessages((prevMessages) => [...prevMessages, message]);
		});

		// This will run when the component is unmounted
		return () => {
			socket.off("connect");
			socket.off("connect_error");
			socket.off("disconnect");
			socket.off("users");
			socket.off("chat");
		};
	}, []);

	return (
		<div className="App">
			<h1 className="page-title">NENIUK.DEV</h1>
			<div className="page-content-table">
				<div className="left-side-column"></div>
				<div className="main-column">
					<MyProfile />
					<MyProjects />
					<div className="contact"></div>
					<div className="blog"></div>
				</div>
				<div className="right-side-column">
					<MyChat
						socket={socket}
						connectedUsers={connectedUsers}
						messages={messages}
						setMessages={setMessages}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
