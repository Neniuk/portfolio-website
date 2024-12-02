import React, { useState } from "react";
import { Socket } from "socket.io-client";

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
    const [chatHidden, setChatHidden] = useState(false);

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

        // Handle chat commands
        if (message.startsWith("/")) {
            // Handle chat commands here
            switch (message) {
                case "/clear":
                case "/c":
                    setMessages([]);
                    break;
                case "/help":
                case "/h":
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            sender: "HELP",
                            message:
                                "Commands:\nHelp-menu: '/help', '/h'\nClear chat: '/clear', '/c'",
                        },
                    ]);
                    break;
                default:
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            sender: "ERROR",
                            message:
                                "Command not found.\nType '/help' for help.",
                        },
                    ]);
                    break;
            }
            // For now, just clear the chat input field
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

    const toggleChatVisibility = () => {
        setChatHidden(!chatHidden);
    };

    return (
        <div className="bg-primaryColor border-outerBorderColor flex w-[95%] flex-col gap-4 rounded-md border-2 border-solid p-6 md:w-[600px] lg:w-[350px]">
            <ChatHeader
                isConnected={isConnected}
                connectedUsers={connectedUsers}
                toggleChatVisibility={toggleChatVisibility}
                chatHidden={chatHidden}
            />
            {!chatHidden && (
                <ChatBody
                    handleChatSubmit={handleChatSubmit}
                    handleMessageChange={handleMessageChange}
                    chatMessage={chatMessage}
                    messages={messages}
                />
            )}
        </div>
    );
};

const MemoizedMyChat = React.memo(MyChat);
export default MemoizedMyChat;
