import React from "react";

// Components
import ChatContent from "./ChatContent";
import ChatInput from "./ChatInput";

// Types
import MessageWithSender from "../../../models/MessageWithSender";

type ChatBodyProps = {
    handleChatSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleMessageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    chatMessage: MessageWithSender;
    setChatMessage: React.Dispatch<React.SetStateAction<MessageWithSender>>;
    messages: MessageWithSender[];
};

const ChatBody: React.FC<ChatBodyProps> = ({
    handleChatSubmit,
    handleMessageChange,
    chatMessage,
    messages,
}) => {
    return (
        <div className="chat-body">
            <ChatContent messages={messages} />
            <ChatInput
                onSubmit={handleChatSubmit}
                message={chatMessage.message}
                onMessageChange={handleMessageChange}
            />
        </div>
    );
};

export default ChatBody;
