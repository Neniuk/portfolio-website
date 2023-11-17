const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const createError = require("http-errors");
const path = require("path");

const indexRouter = require("./routes/index");

//For env File
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// console.log(path.join(__dirname, "../../client/public"));
app.use(express.static(path.join(__dirname, "../../client/public")));

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

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
