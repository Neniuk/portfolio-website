import MyProfile from "./components/Profile";
import MyProjects from "./components/Projects";
import MyChat from "./components/Chat";
import { io } from "socket.io-client";
import React from "react";
import mainTitleDecoration from "./assets/main-title-decoration.png";
import mainTitleDecorationBlue from "./assets/main-title-decoration-blue.png";
import MySnow from "./components/Snow";
import MyArcade from "./components/Arcade";

const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || 3001;
// const CLIENT_PORT = process.env.REACT_APP_CLIENT_PORT || 3000;

const DEV_ADDRESS = process.env.REACT_APP_DEV_ADDRESS || "http://localhost:";
// const PROD_ADDRESS = process.env.REACT_APP_PROD_ADDRESS || "http://localhost:";

const SERVER_ADDRESS = DEV_ADDRESS + SERVER_PORT;
// console.log("Server Address: " + SERVER_ADDRESS);

const socket = io(SERVER_ADDRESS);

const PageTitleDecoration = (props) => (
	<img
		className={"page-title-decoration " + props.decorationSide}
		src={mainTitleDecorationBlue}
		alt="Main title decoration"
	/>
);

function App() {
	// State for number of connected users
	const [connectedUsers, setConnectedUsers] = React.useState(0);
	const [messages, setMessages] = React.useState([]);
	const [isConnected, setIsConnected] = React.useState(false);

	const handleConnectError = React.useCallback(() => {
		if (!socket.connected) {
			setTimeout(() => socket.connect(), SERVER_PORT);
		}
	}, []);

	React.useEffect(() => {
		const handleBeforeUnload = () => {
			socket.close();
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		socket.on("connect", () => {
			console.log("Connected to chat server");
			setIsConnected(true);
		});

		socket.on("connect_error", handleConnectError);

		socket.on("disconnect", (reason) => {
			console.log("Disconnected from chat server");
			setIsConnected(false);

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
			window.removeEventListener("beforeunload", handleBeforeUnload);

			socket.off("connect");
			socket.off("connect_error");
			socket.off("disconnect");
			socket.off("users");
			socket.off("chat");
		};
	}, [handleConnectError]);

	return (
		<div className="App">
			<MySnow />
			<div className="page-title-container">
				<PageTitleDecoration decorationSide="left" />
				<h1 className="page-title">NENIUK.DEV</h1>
				<PageTitleDecoration decorationSide="right" />
			</div>
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
						isConnected={isConnected}
					/>
					<MyArcade />
				</div>
			</div>
		</div>
	);
}

export default App;
