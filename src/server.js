const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const createError = require("http-errors");
const path = require("path");
const socketIo = require("socket.io");
const BannedWords = require("./models/bannedWords");
const crypto = require("crypto");

// const indexRouter = require("./routes/index");

//For env File
dotenv.config({ path: "./.env.local" });

// Environment Variables
const PORT = process.env.PORT || 5000;
const ADDRESS = process.env.DEV_ADDRESS || "http://localhost:";
const PROD_ADDRESS =
	process.env.PROD_ADDRESS ||
	"https://portfolio-website-45f1e0d390b7.herokuapp.com";

const CLIENT_ADDRESS = ADDRESS + PORT;

const app = express();
const server = require("http").createServer(app);
const io = socketIo(server, {
	cors: {
		origin: CLIENT_ADDRESS,
	},
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// console.log(path.join(__dirname, "../../client/public"));
// app.use(express.static(path.join(__dirname, "../../client/public")));
// app.use(express.static(path.join(__dirname, "./public")));

// Routes
// app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send("error");
});

// Socket.io
let connectedUsers = new Set();

const validChatMessage = (msg) => {
	if (msg.length > 250) {
		return false;
	}
	// if (BannedWords.includes(msg.toLowerCase())) {
	// 	return false;
	// }
	const words = msg.split(" ");
	for (let i = 0; i < words.length; i++) {
		if (BannedWords.includes(words[i].toLowerCase())) {
			return false;
		}
	}
	return true;
};

io.on("connection", (socket) => {
	// console.log("A user connected");
	// TODO: Handle collisions and add usernames to connectedUsers, for example as a dictionary
	const username = "User" + crypto.randomBytes(3).toString("hex");
	socket.username = username;

	connectedUsers.add(socket.id);
	io.emit("users", connectedUsers.size);

	socket.on("disconnect", (reason) => {
		// console.log("A user disconnected: " + reason);
		// TODO: Remove username from connectedUsers, release the socket.username
		connectedUsers.delete(socket.id);
		io.emit("users", connectedUsers.size);
	});

	socket.on("chat", (msg) => {
		// Log socket id
		console.log("Sender: " + socket.id);
		console.log("Message: " + msg.message);

		if (!validChatMessage(msg.message)) {
			console.log("Invalid message");
			return;
		}

		msg.sender = "ANONYMOUS";

		// Avoid harmful payloads in message
		msg.message = msg.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
		// Convert to utf8
		msg.message = decodeURIComponent(msg.message);

		socket.broadcast.emit("chat", msg);
	});
});

server.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log(`Server running on port ${PORT}`);
});