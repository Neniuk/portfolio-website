import React from "react";

type ChatHeaderProps = {
    isConnected: boolean;
    connectedUsers: number;
    toggleChatVisibility: () => void;
    chatHidden: boolean;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
    isConnected,
    connectedUsers,
    toggleChatVisibility,
    chatHidden,
}) => {
    return (
        <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-4">
                <h1 className="m-0 p-0 text-2xl">Chat</h1>
                {/* Button to hide chat */}
                <button
                    className="bg-primaryColor border-innerBorderColor focus:border-accentAlt2 focus:text-accentAlt2 rounded-md border-2 border-solid p-2 text-white hover:border-white"
                    title="Toggle chat visibility"
                    onClick={toggleChatVisibility}
                >
                    {chatHidden ? "Show" : "Hide"}
                </button>
            </div>

            {/* Need to have a bottom margin here because the h1 above refuses to center */}
            <div className="mb-1 flex flex-row items-center gap-4">
                <div
                    className={`h-3 w-3 rounded-full ${
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
