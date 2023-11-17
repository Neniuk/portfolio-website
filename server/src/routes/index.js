const express = require("express");
const router = express.Router();

// Get index page
router.get("/", (req, res) => {
	res.render("index", { title: "Portfolio" });
});

module.exports = router;
