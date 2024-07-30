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
        <div className="flex w-full flex-row justify-between">
            <h1 className="m-0 p-0 text-2xl">Chat</h1>
            {/* Need to have a bottom margin here because the h1 above refuses to center */}
            <div className="mb-2 flex flex-row items-center">
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
