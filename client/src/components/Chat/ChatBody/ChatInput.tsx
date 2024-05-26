import React from "react";

type ChatInputProps = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    message: string;
    onMessageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({
    onSubmit,
    message,
    onMessageChange,
}) => {
    return (
        <form className="chat-input-container" onSubmit={onSubmit}>
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
            <button className="chat-send" type="submit">
                Send
            </button>
        </form>
    );
};

export default ChatInput;
