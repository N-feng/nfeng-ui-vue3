const fs = require("fs");
const path = require("path");

module.exports = fs.readdirSync(path.resolve(__dirname, "../packages"));
