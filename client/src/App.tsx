import MyProfile from "./components/Profile";
import MyProjects from "./components/Projects";
import MyChat from "./components/Chat";
import { io } from "socket.io-client";
import React from "react";
import mainTitleDecoration from "./assets/main-title-decoration.png";
import mainTitleDecorationBlue from "./assets/main-title-decoration-blue.png";
import MySnow from "./components/Snow";
import MyArcade from "./components/Arcade";

import DecoratedTitle from "./components/StyleComponents/DecoratedTitle";

const altAccentColor = getComputedStyle(document.documentElement)
	.getPropertyValue("--accent-alt2")
	.trim();

const DecoratedPageTitle = ({ title }: { title: string }) => (
	<DecoratedTitle
		title={title}
		titleSize="2rem"
		titleColor={altAccentColor}
		marginTop="1rem"
		marginBottom="1rem"
		decoration={mainTitleDecorationBlue}
		decorationAlt="Page title decoration"
		decorationWidth="320px"
		decorationHeight="32px"
		decorationBrightness="0.5"
	/>
);

const MIN_RECONNECT_DELAY = 500;
const MAX_RECONNECT_DELAY = 5000;

let reconnectDelay = MIN_RECONNECT_DELAY;

const SERVER_PORT = 5000;
const DEV_ADDRESS = "http://localhost:" + SERVER_PORT;

const PROD_ADDRESS = "https://www.neniuk.dev/";
// console.log("Server Address: " + SERVER_ADDRESS);

const socket = io(PROD_ADDRESS, { transports: ["websocket"] });

const PageTitleDecoration = (props: { decorationSide: string }) => (
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
			setTimeout(() => {
				socket.connect();
				// Double the delay for the next attempt, up to the maximum delay
				reconnectDelay = Math.min(
					reconnectDelay * 2,
					MAX_RECONNECT_DELAY
				);
			}, reconnectDelay);
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
			reconnectDelay = MIN_RECONNECT_DELAY; // Reset the reconnect delay
		});

		socket.on("connect_error", handleConnectError);

		socket.on("reconnect_attempt", () => {
			console.log("Attempting to reconnect to chat server");
		});

		socket.on("disconnect", (reason: string) => {
			console.log("Disconnected from chat server");
			setIsConnected(false);

			if (reason === "io server disconnect") {
				// the disconnection was initiated by the server, you need to reconnect manually
				socket.connect();
			}
		});

		socket.on("users", (numUsers: React.SetStateAction<number>) => {
			setConnectedUsers(numUsers);
		});

		socket.on("chat", (message: any) => {
			// console.log("Message received: " + message);

			setMessages((prevMessages) => [...prevMessages, message]);
		});

		// This will run when the component is unmounted
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);

			socket.off("connect");
			socket.off("connect_error");
			socket.off("reconnect_attempt");
			socket.off("disconnect");
			socket.off("users");
			socket.off("chat");
		};
	}, [handleConnectError]);

	return (
		<>
			<div className="App">
				<h1 className="text-lg font-bold text-white underline">
					Hello world!
				</h1>
				<MySnow />
				<DecoratedPageTitle title="NENIUK.DEV" />
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
		</>
	);
}

export default App;
