import BannedWords from "../bannedWords";

const validChatMessage = (msg: string) => {
    // if (msg.length > 250) {
    // 	return false;
    // }
    // if (BannedWords.includes(msg.toLowerCase())) {
    // 	return false;
    // }
    // Check if any of the words in the message are in the banned words list
    const words = msg.split(" ");
    for (let i = 0; i < words.length; i++) {
        if (BannedWords.includes(words[i].toLowerCase())) {
            return false;
        }
    }
    return true;
};

export default validChatMessage;
