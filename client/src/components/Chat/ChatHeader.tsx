import React from "react";

type ChatHeaderProps = {
    isConnected: boolean;
    connectedUsers: number;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
    isConnected,
    connectedUsers,
}) => {
    return (
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
};

export default ChatHeader;
