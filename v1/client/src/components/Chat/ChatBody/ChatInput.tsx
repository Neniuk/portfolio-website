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
        <form className="mt-3 flex w-full flex-row" onSubmit={onSubmit}>
            <input
                type="text"
                className={`bg-primaryColor border-innerBorderColor mr-2 max-h-[50px] min-h-[50px] flex-grow rounded-md border-2 border-solid p-5 text-white ${
                    message.length === 250 ? "border-disabledColor" : ""
                }`}
                placeholder="Type a message..."
                value={message}
                onChange={onMessageChange}
                maxLength={250}
            />
            <button
                className="bg-primaryColor border-innerBorderColor focus:border-accentAlt2 focus:text-accentAlt2 max-h-[50px] min-h-[50px] flex-grow-0 rounded-md border-2 border-solid px-2 text-white hover:border-white"
                type="submit"
            >
                Send
            </button>
        </form>
    );
};

export default ChatInput;
