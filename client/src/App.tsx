import { io } from "socket.io-client";
import React, { useState, useEffect, useCallback } from "react";

// Components
import MainTitle from "./components/MainTitle";
import { default as Profile } from "./components/Profile";
import { default as Projects } from "./components/Projects";
import { default as Chat } from "./components/Chat";
// import { default as Snow } from "./components/Snow";
import { default as Starfield } from "./components/Starfield";
import { default as SunMoonCycle } from "./components/SunMoonCycle";
import { default as Arcade } from "./components/Arcade";
import { default as Experience } from "./components/Experience";

// Types
import MessageWithSender from "./models/MessageWithSender";

const ENVIRONMENT = process.env.NODE_ENV;

const MIN_RECONNECT_DELAY: number = 500;
const MAX_RECONNECT_DELAY: number = 5000;
let reconnectDelay: number = MIN_RECONNECT_DELAY;

const DEV_SERVER_PORT = 5000;
const DEV_ADDRESS = "http://localhost:" + DEV_SERVER_PORT;

const PROD_ADDRESS = "https://www.neniuk.dev/";

let SERVER_ADDRESS = "";
if (ENVIRONMENT === "development") {
    SERVER_ADDRESS = DEV_ADDRESS;
    console.log("Connecting to development server...");
} else if (ENVIRONMENT === "production") {
    SERVER_ADDRESS = PROD_ADDRESS;
} else {
    console.error("Invalid environment, unable to connect to server");
}

if (SERVER_ADDRESS === "") {
    throw new Error("Invalid server address");
}

const socket = io(SERVER_ADDRESS, { transports: ["websocket"] });

const App = () => {
    const [connectedUsers, setConnectedUsers] = useState(0);
    const [messages, setMessages] = useState<MessageWithSender[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    // const currentMonth: number = new Date().getMonth();
    // const isWinter: boolean = currentMonth >= 10 || currentMonth <= 2;

    const handleConnectError = useCallback(() => {
        if (!socket.connected) {
            setTimeout(() => {
                socket.connect();
                // Double the delay for the next attempt, up to the maximum delay
                reconnectDelay = Math.min(
                    reconnectDelay * 2,
                    MAX_RECONNECT_DELAY
                );
                console.log(
                    `Connection failed, reconnecting in ${reconnectDelay}ms`
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
            console.log(
                `### Connected to chat server ${
                    ENVIRONMENT === "development" ? "(DEV)" : ""
                } ###`
            );
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

        socket.on("chat", (message: MessageWithSender) => {
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
        <div className="App mb-8 flex h-full w-full flex-col items-center justify-center">
            {/* {isWinter ? <Snow /> : <Starfield />} */}
            <Starfield />
            <MainTitle />
            <div className="flex w-full flex-col justify-center gap-6 lg:flex-row">
                <div className="left-column"></div>
                <div className="flex flex-col items-center justify-center gap-6">
                    <Profile />
                    <Experience />
                    <Projects />
                    <SunMoonCycle />
                </div>
                <div className="right-column mb-10 flex flex-col items-center justify-center gap-6 lg:mb-0 lg:items-start lg:justify-start">
                    <Chat
                        socket={socket}
                        connectedUsers={connectedUsers}
                        messages={messages}
                        setMessages={setMessages}
                        isConnected={isConnected}
                    />
                    <Arcade />
                </div>
            </div>
        </div>
    );
};

export default App;
