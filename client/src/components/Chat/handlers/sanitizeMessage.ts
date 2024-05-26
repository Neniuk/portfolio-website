const sanitizeMessage = (message: string): string => {
    // Limit the message length to 250 characters
    message = message.substring(0, 250);

    // Avoid harmful payloads in message
    message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Convert to utf8
    message = decodeURIComponent(message);

    return message;
};

export default sanitizeMessage;
