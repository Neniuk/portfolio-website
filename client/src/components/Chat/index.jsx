import React, { Component } from "react";
import "./styles.css";
import arrow from "../../assets/arrow.png";

const submitStyleDelay = 100; // ms

const ChatHeader = (props) => (
	<div className="chat-header">
		<div className="chat-title-container">
			<h1 className="chat-title">Chat</h1>
		</div>
		<div className="chat-connection-indicator">
			<div className="chat-connection-indicator-dot"></div>
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
					<strong className="chat-bold">
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

		if (this.state.chatMessage.message.trim().length === 0) {
			this.setState({ chatMessage: { sender: senderName, message: "" } }); // Clear chat input field
			return;
		}

		const button = e.target;
		button.classList.add("clicked");
		setTimeout(() => button.classList.remove("clicked"), submitStyleDelay); // Remove the class after 2 seconds

		// console.log("Chat submitted: " + this.state.message);
		// console.log(this.props.messages);

		// Send the message to the server
		console.log(this.state.chatMessage);
		this.props.socket.emit("chat", this.state.chatMessage);

		// Add the message to the messages state
		this.props.setMessages((prevMessages) => [
			...prevMessages,
			this.state.chatMessage,
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
						message={this.state.message}
						onMessageChange={this.handleMessageChange}
					/>
				</div>
			</div>
		);
	}
}

export default React.memo(MyChat);
