import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { Server, Socket } from "socket.io";
import crypto from "crypto";
import { createServer } from "http";
import { rateLimit } from "express-rate-limit";

import BannedWords from "./models/bannedWords";

interface CustomError extends Error {
    status?: number;
}

dotenv.config();

const PORT: string = process.env.PORT ?? "5000";
const ENVIRONMENT: string = process.env.NODE_ENV ?? "";
const MAX_CONNECTIONS: number = 1000;

let ALLOWED_ORIGINS: string[] = [];
if (ENVIRONMENT === "development") {
    console.log("Running in development mode");
    ALLOWED_ORIGINS = [
        "http://localhost:3000",
        "http://localhost:5000",
        "http://localhost:5173",
    ];
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

// Serve static files
if (ENVIRONMENT === "development") {
    console.log("Serving static files in development mode");
} else if (ENVIRONMENT === "production") {
    console.log("Serving static files in production mode");
} else {
    throw new Error("Invalid environment");
}

const clientPath = path.join(__dirname, "../client");
app.use(express.static(clientPath));
app.get("*", (_req: Request, res: Response, _next: NextFunction) => {
    res.sendFile(path.join(clientPath, "index.html"));
});

// Error handler
app.use(
    (err: CustomError, req: Request, res: Response, _next: NextFunction) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        // render the error page
        res.status(err.status ?? 500);
        res.send("error");
    }
);

// Socket.io
const connectedUsers: Map<string, string> = new Map();
const connectedUsernames: Set<string> = new Set();
let currentConnections: number = 0;

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

const generateUniqueUsername = (
    connectedUsernamesLocal: Set<string>
): string => {
    let username: string;

    do {
        username = "User" + crypto.randomBytes(3).toString("hex");
    } while (connectedUsernamesLocal.has(username));

    return username;
};

const handleConnect = (socket: Socket) => {
    if (currentConnections >= MAX_CONNECTIONS) {
        socket.disconnect();
        return;
    }

    currentConnections++;

    const username = generateUniqueUsername(connectedUsernames);
    socket.data.username = username;

    connectedUsers.set(socket.id, username);
    connectedUsernames.add(username);

    io.emit("users", currentConnections);
};

const handleDisconnect = (socket: Socket) => {
    currentConnections--;

    const usernameToDelete: string | undefined = connectedUsers.get(socket.id);
    connectedUsers.delete(socket.id);

    if (usernameToDelete) {
        connectedUsernames.delete(usernameToDelete);
    }

    io.emit("users", currentConnections);
};

const handleChat = (
    socket: Socket,
    msg: { message: string; sender: string }
) => {
    if (typeof msg !== "object" || !msg.message || !msg.sender) {
        return;
    }

    if (!validChatMessage(msg.message)) {
        return;
    }

    msg.sender = socket.data.username || "ANONYMOUS";

    try {
        // Sanitize message
        msg.sender = decodeURIComponent(msg.sender);
        msg.message = msg.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        socket.broadcast.emit("chat", msg);
    } catch (err) {
        console.log(err);
        return;
    }
};

io.on("connection", (socket: Socket) => {
    handleConnect(socket);

    socket.on("disconnect", (_reason: string) => {
        handleDisconnect(socket);
    });

    socket.on("chat", (msg: { message: string; sender: string }) => {
        handleChat(socket, msg);
    });
});

server.on("error", (err: Error) => {
    console.log(err);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
