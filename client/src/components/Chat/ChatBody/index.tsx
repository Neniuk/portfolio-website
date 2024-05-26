import React from "react";

import ChatContent from "./ChatContent";
import ChatInput from "./ChatInput";

type ChatBodyProps = {
    self: any;
    messages: any;
};

const ChatBody: React.FC<ChatBodyProps> = ({ self, messages }) => {
    return (
        <div className="chat-body">
            <ChatContent messages={messages} />
            <ChatInput
                onSubmit={self.handleChatSubmit}
                message={self.state.chatMessage.message}
                onMessageChange={self.handleMessageChange}
            />
        </div>
    );
};

export default ChatBody;
