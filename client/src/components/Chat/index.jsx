import React, { Component } from "react";
import "./styles.css";
// import arrow from "../../assets/arrow.png";
import BannedWords from "./bannedWords.js";

const submitStyleDelay = 100; // ms

const ChatHeader = (props) => (
	<div className="chat-header">
		<div className="chat-title-container">
			<h1 className="chat-title">Chat</h1>
		</div>
		<div className="chat-connection-indicator">
			<div
				className="chat-connection-indicator-dot"
				title="Chat connection"
			></div>
			<div className="connected-users-container">
				<p className="chat-connection-count-text">Users: </p>
				<p className="chat-connection-count">{props.connectedUsers}</p>
			</div>
		</div>
	</div>
);

const ChatContent = React.memo(({ messages }) => (
	<div className="chat-content-container">
		{messages.map((message, index) => (
			<div key={index} className="chat-message-container">
				<p className="chat-message-text">
					<strong
						className={
							message.sender === "ME"
								? "chat-bold-me"
								: "chat-bold-anonymous"
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
));

const ChatInput = ({ onSubmit, message, onMessageChange }) => (
	<form className="chat-input-container">
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
		<button className="chat-send" onClick={onSubmit}>
			Send
		</button>
	</form>
);

const validChatMessage = (msg) => {
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

const senderName = "ME";
class MyChat extends Component {
	state = {
		chatMessage: {
			sender: senderName,
			message: "",
		},
	};

	handleChatSubmit = (e) => {
		e.preventDefault();

		const button = e.target;
		button.classList.add("clicked");
		setTimeout(() => button.classList.remove("clicked"), submitStyleDelay); // Remove the class after 2 seconds

		let message = this.state.chatMessage.message.trim();

		// If the message is empty, clear the chat input field and return
		if (message.length === 0) {
			this.setState({ chatMessage: { sender: senderName, message: "" } });
			return;
		}

		// If the message is not valid, clear the chat input field and return
		if (!validChatMessage(message)) {
			this.setState({ chatMessage: { sender: senderName, message: "" } });
			return;
		}

		// Limit the message length to 250 characters
		message = message.substring(0, 250);

		// Avoid harmful payloads in message
		message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

		// Convert to utf8
		message = decodeURIComponent(message);

		// Build new sanitized message object
		const sanitizedMessage = {
			sender: senderName,
			message: message,
		};

		// Send the message to the server
		this.props.socket.emit("chat", sanitizedMessage);

		// Add the message to the messages state
		this.props.setMessages((prevMessages) => [
			...prevMessages,
			sanitizedMessage,
		]);

		// Clear chat input field
		this.setState({ chatMessage: { sender: senderName, message: "" } }); // Clear chat input field
	};

	handleMessageChange = (e) => {
		this.setState({
			chatMessage: { sender: senderName, message: e.target.value },
		});
	};

	render() {
		const { messages } = this.props;

		return (
			<div className="card">
				<div className="chat">
					<ChatHeader connectedUsers={this.props.connectedUsers} />
					<ChatContent messages={messages} />
					<ChatInput
						onSubmit={this.handleChatSubmit}
						message={this.state.chatMessage.message}
						onMessageChange={this.handleMessageChange}
					/>
				</div>
			</div>
		);
	}
}

export default React.memo(MyChat);
