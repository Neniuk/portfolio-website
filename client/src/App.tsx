import { io } from "socket.io-client";
import React, { useState, useEffect, useCallback } from "react";

// Components
import MyProfile from "./components/Profile";
import MyProjects from "./components/Projects";
import MyChat from "./components/Chat";
import MySnow from "./components/Snow";
import MainTitle from "./components/MainTitle";
// import MyArcade from "./components/Arcade";

const MIN_RECONNECT_DELAY: number = 500;
const MAX_RECONNECT_DELAY: number = 5000;
let reconnectDelay: number = MIN_RECONNECT_DELAY;

// const SERVER_PORT = 5000;
// const DEV_ADDRESS = "http://localhost:" + SERVER_PORT;

const PROD_ADDRESS = "https://www.neniuk.dev/";
// console.log("Server Address: " + SERVER_ADDRESS);

const socket = io(PROD_ADDRESS, { transports: ["websocket"] });

const App = () => {
    const [connectedUsers, setConnectedUsers] = useState(0);
    const [messages, setMessages] = useState<any[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    const handleConnectError = useCallback(() => {
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

    useEffect(() => {
        const handleBeforeUnload = () => {
            socket.close();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        socket.on("connect", () => {
            console.log("Connected to chat server");
            setIsConnected(true);

            // Reset the reconnect delay
            reconnectDelay = MIN_RECONNECT_DELAY;
        });

        socket.on("connect_error", handleConnectError);

        socket.on("reconnect_attempt", () => {
            console.log("Attempting to reconnect to chat server");
        });

        socket.on("disconnect", (reason: string) => {
            console.log("Disconnected from chat server");
            setIsConnected(false);

            if (reason === "io server disconnect") {
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
        <div className="App m-auto flex h-full w-full flex-col items-center">
            {/* <h1 className="text-lg font-bold text-white underline">
                Hello world!
            </h1> */}
            <MySnow />
            <MainTitle />
            {/* <DecoratedPageTitle title="NENIUK.DEV" /> */}
            <div className="page-content-table flex w-full flex-row justify-center gap-6">
                <div className="left-column"></div>
                <div className="main-column">
                    <MyProfile />
                    <MyProjects />
                    <div className="contact"></div>
                    <div className="blog"></div>
                </div>
                <div className="right-column">
                    <MyChat
                        socket={socket}
                        connectedUsers={connectedUsers}
                        messages={messages}
                        setMessages={setMessages}
                        isConnected={isConnected}
                    />
                    {/* <MyArcade /> */}
                </div>
            </div>
        </div>
    );
};

export default App;
