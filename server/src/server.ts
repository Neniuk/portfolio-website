import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { Server, Socket } from "socket.io";
import crypto from "crypto";
import { createServer } from "http";

import BannedWords from "./models/bannedWords";

dotenv.config({ path: "./.env.local" });

const PORT: string = process.env.PORT || "5000";
const ALLOWED_ORIGINS: string[] = [
    "http://localhost:3000",
    "https://neniuk.dev",
    "https://www.neniuk.dev",
    "https://portfolio-website-45f1e0d390b7.herokuapp.com",
];

const app: Express = express();
const server = createServer(app);

// Socket server using cors
const io = new Server(server, {
    cors: {
        origin: ALLOWED_ORIGINS,
        credentials: true,
    },
});

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

// Socket.io types
// interface ServerToClientEvents {
//     noArg: () => void;
//     basicEmit: (a: number, b: string, c: Buffer) => void;
//     withAck: (d: string, callback: (e: number) => void) => void;
// }

//   interface ClientToServerEvents {
//     hello: () => void;
// }

//   interface InterServerEvents {
//     ping: () => void;
// }

//   interface SocketData {
//     name: string;
//     age: number;
// }

// Socket.io
let connectedUsers: Set<string> = new Set();

const validChatMessage = (msg: string): boolean => {
    if (msg.length > 250) {
        return false;
    }

    const words = msg.split(" ");
    for (let i = 0; i < words.length; i++) {
        if (BannedWords.includes(words[i].toLowerCase())) {
            return false;
        }
    }

    return true;
};

io.on("connection", (socket: Socket) => {
    // console.log("A user connected");
    // TODO: Handle collisions and add usernames to connectedUsers, for example as a dictionary
    const username = "User" + crypto.randomBytes(3).toString("hex");
    socket.data.username = username;

    connectedUsers.add(socket.id);
    io.emit("users", connectedUsers.size);

    socket.on("disconnect", (_reason: any) => {
        // console.log("A user disconnected: " + _reason);
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
