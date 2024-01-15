import React, { Component } from "react";
import "./styles.css";

import Card from "../StyleComponents/Card";

import BannedWords from "./bannedWords";

const submitStyleDelay = 100; // ms

const ChatHeader = ({
    isConnected,
    connectedUsers,
}: {
    isConnected: boolean;
    connectedUsers: number;
}) => (
    <div className="chat-header">
        <div className="chat-title-container">
            <h1 className="text-2xl">Chat</h1>
        </div>
        <div className="chat-connection-indicator">
            <div
                className={`chat-connection-indicator-dot ${
                    isConnected ? "connected" : "disconnected"
                }`}
                title="Chat connection"
            ></div>
            <div className="connected-users-container">
                <p className="chat-connection-count-text">Users: </p>
                <p className="chat-connection-count">{connectedUsers}</p>
            </div>
        </div>
    </div>
);

const ChatContent = React.memo(
    ({
        messages,
    }: {
        messages: Array<{ sender: string; message: string }>;
    }) => (
        <div className="chat-content-container">
            {messages.map((message, index) => (
                <div key={index} className="chat-message-container">
                    <p className="chat-message-text">
                        <strong
                            className={
                                message.sender === "ME"
                                    ? "chat-bold-me"
                                    : "chat-bold-anonymous"
                            }
                        >
                            {message.sender}
                            {" >"}
                        </strong>{" "}
                        {message.message}
                    </p>
                </div>
            ))}
        </div>
    )
);

const ChatInput = ({
    onSubmit,
    message,
    onMessageChange,
}: {
    onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
    message: string;
    onMessageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
    <form className="chat-input-container">
        <input
            type="text"
            className={`chat-input ${
                message.length === 250 ? "input-max-length" : ""
            }`}
            placeholder="Type a message..."
            value={message}
            onChange={onMessageChange}
            maxLength={250}
        />
        <button className="chat-send" onClick={onSubmit}>
            Send
        </button>
    </form>
);

const ChatBody = ({ self, messages }: { self: any; messages: any }) => (
    <div className="chat-body">
        <ChatContent messages={messages} />
        <ChatInput
            onSubmit={self.handleChatSubmit}
            message={self.state.chatMessage.message}
            onMessageChange={self.handleMessageChange}
        />
    </div>
);

const validChatMessage = (msg: string) => {
    // if (msg.length > 250) {
    // 	return false;
    // }
    // if (BannedWords.includes(msg.toLowerCase())) {
    // 	return false;
    // }
    // Check if any of the words in the message are in the banned words list
    const words = msg.split(" ");
    for (let i = 0; i < words.length; i++) {
        if (BannedWords.includes(words[i].toLowerCase())) {
            return false;
        }
    }
    return true;
};

type ChatProps = {
    socket: any;
    messages: Array<{ sender: string; message: string }>;
    setMessages: any;
    isConnected: boolean;
    connectedUsers: number;
};

const senderName = "ME";
class MyChat extends Component<ChatProps> {
    state = {
        chatMessage: {
            sender: senderName,
            message: "",
        },
    };

    handleChatSubmit = (e: { preventDefault: () => void; target: any }) => {
        e.preventDefault();

        const button = e.target;
        button.classList.add("clicked");
        setTimeout(() => button.classList.remove("clicked"), submitStyleDelay); // Remove the class after 2 seconds

        let message = this.state.chatMessage.message.trim();

        // If the message is empty, clear the chat input field and return
        if (message.length === 0) {
            this.setState({ chatMessage: { sender: senderName, message: "" } });
            return;
        }

        // If the message is not valid, clear the chat input field and return
        if (!validChatMessage(message)) {
            this.setState({ chatMessage: { sender: senderName, message: "" } });
            return;
        }

        // Limit the message length to 250 characters
        message = message.substring(0, 250);

        // Avoid harmful payloads in message
        message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        // Convert to utf8
        message = decodeURIComponent(message);

        // Build new sanitized message object
        const sanitizedMessage = {
            sender: senderName,
            message: message,
        };

        // Send the message to the server
        this.props.socket.emit("chat", sanitizedMessage);

        // Add the message to the messages state
        this.props.setMessages((prevMessages: any) => [
            ...prevMessages,
            sanitizedMessage,
        ]);

        // Clear chat input field
        this.setState({ chatMessage: { sender: senderName, message: "" } }); // Clear chat input field
    };

    handleMessageChange = (e: { target: { value: any } }) => {
        this.setState({
            chatMessage: { sender: senderName, message: e.target.value },
        });
    };

    render() {
        const { messages } = this.props;

        return (
            <Card
                headerInclude={true}
                headerContent={<ChatHeader {...this.props} />}
                bodyContent={<ChatBody self={this} messages={messages} />}
            />
        );
    }
}

export default React.memo(MyChat);
