import express, { Express, Request, Response, Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Serve the static files from the React app in the client folder
// The client folder is in the same directory as the server folder
// The client public folder is in the same directory as the client folder
app.use(express.static(__dirname + "/client/public"));

// App get the index.html file from the client build folder

app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
	console.log(`Server is Fire at http://localhost:${port}`);
});
