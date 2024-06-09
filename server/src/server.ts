import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { Server, Socket } from "socket.io";
import crypto from "crypto";
import { createServer } from "http";
import { rateLimit } from "express-rate-limit";

import BannedWords from "./models/bannedWords";

dotenv.config({ path: "./.env.local" });

const PORT: string = process.env.PORT ?? "5000";
const ENVIRONMENT: string = process.env.NODE_ENV ?? "";

let ALLOWED_ORIGINS: string[] = [];
if (ENVIRONMENT === "development") {
    console.log("Running in development mode");
    ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:5173"];
} else if (ENVIRONMENT === "production") {
    console.log("Running in production mode");
    ALLOWED_ORIGINS = [
        "https://neniuk.dev",
        "https://www.neniuk.dev",
        "https://portfolio-website-45f1e0d390b7.herokuapp.com",
    ];
} else {
    throw new Error("Invalid environment");
}

const app: Express = express();
const server = createServer(app);

// Socket server using cors
const io = new Server(server, {
    cors: {
        origin: ALLOWED_ORIGINS,
        credentials: true,
    },
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (_req: Request, res: Response, _next: NextFunction) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Error handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send("error");
});

// Socket.io
let connectedUsers: Set<string> = new Set();

const validChatMessage = (msg: string): boolean => {
    if (msg.length > 250) {
        return false;
    }

    const words = msg.split(" ");
    for (const word of words) {
        if (BannedWords.includes(word.toLowerCase())) {
            return false;
        }
    }

    return true;
};

io.on("connection", (socket: Socket) => {
    // TODO: Handle collisions and add usernames to connectedUsers, for example as a dictionary
    const username = "User" + crypto.randomBytes(3).toString("hex");
    socket.data.username = username;

    connectedUsers.add(socket.id);
    io.emit("users", connectedUsers.size);

    socket.on("disconnect", (_reason: any) => {
        // TODO: Remove username from connectedUsers, release the socket.username
        connectedUsers.delete(socket.id);
        io.emit("users", connectedUsers.size);
    });

    socket.on("chat", (msg: { message: string; sender: string }) => {
        if (typeof msg !== "object" || !msg.message || !msg.sender) {
            console.log("Invalid message or sender");
            return;
        }

        // Log socket id
        console.log("Sender: " + socket.id);
        console.log("Message: " + msg.message);

        if (!validChatMessage(msg.message)) {
            console.log("Invalid message");
            return;
        }

        msg.sender = "ANONYMOUS";

        try {
            // Sanitize message
            msg.sender = decodeURIComponent(msg.sender);
            msg.message = msg.message
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");

            socket.broadcast.emit("chat", msg);
        } catch (err) {
            console.log(err);
            return;
        }
    });
});

server.on("error", (err: Error) => {
    console.log(err);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
