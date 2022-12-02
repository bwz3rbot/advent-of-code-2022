const path = require("path");
const fs = require("fs/promises");
module.exports = async day =>
	fs.readFile(path.join("day", `${day}`, "input.txt"), "utf8");
