const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const createError = require("http-errors");
const path = require("path");
const socketIo = require("socket.io");
const BannedWords = require("./models/bannedWords");

// const indexRouter = require("./routes/index");

//For env File
dotenv.config({ path: "./.env.local" });

// Environment Variables
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const CLIENT_PORT = process.env.CLIENT_PORT || 3000;
const DEV_ADDRESS = process.env.DEV_ADDRESS || "http://localhost:";
const PROD_ADDRESS = process.env.PROD_ADDRESS || "http://127.0.0.1:";
const NODE_ENV = process.env.NODE_ENV || "development";

const CLIENT_ADDRESS = DEV_ADDRESS + CLIENT_PORT;

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
// console.log(path.join(__dirname, "../../client/public"));
// app.use(express.static(path.join(__dirname, "../../client/public")));
// app.use(express.static(path.join(__dirname, "./public")));

// Routes
// app.use("/", indexRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
// 	next(createError(404));
// });

// error handler
// app.use((err, req, res, next) => {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get("env") === "development" ? err : {};

// 	// render the error page
// 	res.status(err.status || 500);
// 	res.send("error");
// });

// app.listen(port, () => {
// 	console.log(`Server is running at http://localhost:${port}`);
// });

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
	connectedUsers.add(socket.id);
	io.emit("users", connectedUsers.size);

	socket.on("disconnect", (reason) => {
		// console.log("A user disconnected: " + reason);
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

server.listen(SERVER_PORT, (err) => {
	if (err) console.log(err);
	console.log(
		`Server is running at ${
			NODE_ENV === "production" ? PROD_ADDRESS : DEV_ADDRESS
		}${SERVER_PORT}`
	);
});
