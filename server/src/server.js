const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const createError = require("http-errors");
const path = require("path");
const socketIo = require("socket.io");

const indexRouter = require("./routes/index");

//For env File
dotenv.config();

const app = express();
const server = require("http").createServer(app);
const io = socketIo(server, {
	cors: {
		origin: "http://localhost:3000",
	},
});

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// console.log(path.join(__dirname, "../../client/public"));
app.use(express.static(path.join(__dirname, "../../client/public")));
// app.use(express.static(path.join(__dirname, "./public")));

// Routes
app.use("/", indexRouter);

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

// app.listen(port, () => {
// 	console.log(`Server is running at http://localhost:${port}`);
// });

// Socket.io

let connectedUsers = new Set();

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
		console.log("Sender: " + msg.sender);
		console.log("Message: " + msg.message);
		msg.sender = "ANONYMOUS";
		socket.broadcast.emit("chat", msg);
	});
});

server.listen(port, (err) => {
	if (err) console.log(err);
	console.log(`Listening on port http://localhost:${port}`);
});
