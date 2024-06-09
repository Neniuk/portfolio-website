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
        <div className="flex w-full flex-row items-center justify-between">
            <h1 className="text-2xl">Chat</h1>
            <div className="flex flex-row items-center">
                <div
                    className={`mr-4 h-3 w-3 rounded-full ${
                        isConnected
                            ? "bg-connectedColor"
                            : "bg-disconnectedColor"
                    }`}
                    title="Chat connection"
                ></div>
                <p>Users: {connectedUsers}</p>
            </div>
        </div>
    );
};

export default ChatHeader;
