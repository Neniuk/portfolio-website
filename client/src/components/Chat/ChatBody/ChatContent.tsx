import React from "react";

type ChatContentProps = {
    messages: Array<{ sender: string; message: string }>;
};

const ChatContent: React.FC<ChatContentProps> = ({ messages }) => {
    return (
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
    );
};

export default ChatContent;
