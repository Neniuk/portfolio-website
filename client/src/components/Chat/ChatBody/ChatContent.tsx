import React from "react";

type ChatContentProps = {
    messages: Array<{ sender: string; message: string }>;
};

const ChatContent: React.FC<ChatContentProps> = ({ messages }) => {
    return (
        <div className="bg-secondaryColor border-innerBorderColor flex max-h-[300px] min-h-[300px] w-full flex-col items-start gap-1 overflow-y-auto whitespace-pre-wrap break-all rounded-md border-2 border-solid p-6">
            {messages.map((message, index) => (
                <div key={index}>
                    <p>
                        <strong
                            className={
                                message.sender === "ME"
                                    ? "text-accentColor font-bold"
                                    : "text-accentSecondaryColor font-bold"
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
