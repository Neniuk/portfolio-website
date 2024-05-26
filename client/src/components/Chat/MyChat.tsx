import React, { useState } from "react";
import { Socket } from "socket.io-client";
import "./styles.css";

// Component template
import Card from "../StyleComponents/Card";

// Components
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";

// Handlers
import validChatMessage from "./handlers/validateChatMessage";
import sanitizeMessage from "./handlers/sanitizeMessage";

// Types
import MessageWithSender from "../../models/MessageWithSender";

const submitStyleDelay = 100; // ms
const senderName = "ME";

type ChatProps = {
    socket: Socket;
    messages: MessageWithSender[];
    setMessages: React.Dispatch<React.SetStateAction<MessageWithSender[]>>;
    isConnected: boolean;
    connectedUsers: number;
};

const MyChat: React.FC<ChatProps> = ({
    socket,
    messages,
    setMessages,
    isConnected,
    connectedUsers,
}) => {
    const [chatMessage, setChatMessage] = useState<MessageWithSender>({
        sender: senderName,
        message: "",
    });

    const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const button = e.currentTarget;
        button.classList.add("clicked");
        setTimeout(() => button.classList.remove("clicked"), submitStyleDelay); // Remove the class after 2 seconds

        let message = chatMessage.message.trim();

        // If the message is empty, clear the chat input field and return
        if (message.length === 0) {
            setChatMessage({ sender: senderName, message: "" });
            return;
        }

        // If the message is not valid, clear the chat input field and return
        if (!validChatMessage(message)) {
            setChatMessage({ sender: senderName, message: "" });
            return;
        }

        message = sanitizeMessage(message);

        // Build new sanitized message object
        const sanitizedMessage = {
            sender: senderName,
            message: message,
        };

        // Send the message to the server
        socket.emit("chat", sanitizedMessage);

        // Add the message to the messages state
        setMessages((prevMessages) => [...prevMessages, sanitizedMessage]);

        // Clear chat input field
        setChatMessage({ sender: senderName, message: "" }); // Clear chat input field
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChatMessage({ sender: senderName, message: e.target.value });
    };

    return (
        <Card
            headerInclude={true}
            headerContent={
                <ChatHeader
                    isConnected={isConnected}
                    connectedUsers={connectedUsers}
                />
            }
            bodyContent={
                <ChatBody
                    handleChatSubmit={handleChatSubmit}
                    handleMessageChange={handleMessageChange}
                    chatMessage={chatMessage}
                    setChatMessage={setChatMessage}
                    messages={messages}
                />
            }
        />
    );
};

export default MyChat;
