import React from "react";

type ChatContentProps = {
    messages: Array<{ sender: string; message: string }>;
};

const getMessageSenderStyle = (sender: string): string => {
    let senderStyle: string = "text-accentSecondaryColor font-bold";
    switch (sender) {
        case "ME":
            senderStyle = "text-accentColor font-bold";
            break;
        case "HELP":
            senderStyle = "text-green-500 font-bold";
            break;
        case "ERROR":
            senderStyle = "text-red-500 font-bold";
            break;
        default:
            break;
    }
    return senderStyle;
};

const getMessageContentStyle = (sender: string): string => {
    let contentStyle: string = "";
    switch (sender) {
        case "HELP":
            contentStyle = "text-green-300";
            break;
        case "ERROR":
            contentStyle = "text-red-300";
            break;
        default:
            break;
    }
    return contentStyle;
};

const ChatContent: React.FC<ChatContentProps> = ({ messages }) => {
    return (
        <div className="bg-secondaryColor border-innerBorderColor flex max-h-[300px] min-h-[300px] w-full flex-col items-start gap-1 overflow-y-auto whitespace-pre-wrap break-all rounded-md border-2 border-solid p-6">
            {messages.map((message, index) => (
                <div key={index}>
                    <p>
                        <strong
                            className={getMessageSenderStyle(message.sender)}
                        >
                            {message.sender}
                            {" >"}
                        </strong>{" "}
                        <span
                            className={getMessageContentStyle(message.sender)}
                        >
                            {message.message}
                        </span>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ChatContent;
