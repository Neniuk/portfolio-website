import React, { Component } from "react";
import "./styles.css";
import arrow from "../../assets/arrow.png";

const submitStyleDelay = 100; // ms

const ChatHeader = () => (
	<div className="chat-header">
		<div className="chat-title-container">
			<h1 className="chat-title">Chat</h1>
		</div>
		<div className="chat-connection-indicator">
			<div className="chat-connection-indicator-dot"></div>
			<p className="chat-connection-indicator-text">Connected</p>
		</div>
	</div>
);

const ChatContent = ({ messages }) => (
	<div className="chat-content-container">
		{messages.map((message, index) => (
			<div key={index} className="chat-message-container">
				<p className="chat-message-text">
					<strong className="chat-bold">Anonymous{">"}:</strong>{" "}
					{message}
				</p>
			</div>
		))}
	</div>
);

const ChatInput = ({ onSubmit, message, onMessageChange }) => (
	<div className="chat-input-container">
		<input
			className="chat-input"
			placeholder="Type a message..."
			value={message}
			onChange={onMessageChange}
		/>
		<button className="chat-send" onClick={onSubmit}>
			Send
		</button>
	</div>
);

class MyChat extends Component {
	state = {
		message: "",
		messages: [],
	};

	handleChatSubmit = (e) => {
		e.preventDefault();

		if (this.state.message.trim().length === 0) {
			this.setState({ message: "" }); // Clear the message input after submit
			return;
		}

		const button = e.target;
		button.classList.add("clicked");
		setTimeout(() => button.classList.remove("clicked"), submitStyleDelay); // Remove the class after 2 seconds

		console.log("Chat submitted: " + this.state.message);

		// Add the message to the messages array
		this.setState((prevState) => ({
			messages: [...prevState.messages, this.state.message],
			message: "", // Clear the message input after submit
		}));
	};

	handleMessageChange = (e) => {
		this.setState({ message: e.target.value });
	};

	render() {
		return (
			<div className="card">
				<div className="chat">
					<ChatHeader />
					<ChatContent messages={this.state.messages} />
					<ChatInput
						onSubmit={this.handleChatSubmit}
						message={this.state.message}
						onMessageChange={this.handleMessageChange}
					/>
				</div>
			</div>
		);
	}
}

export default MyChat;
