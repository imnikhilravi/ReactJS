const path = require("path");
const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");


app.use(static);

app.use("*", (req, res) => {
    res.status(404).json({ error: "Page not found" });
})


app.get("/", (req, res) => {
    res.sendFile('/index.html');
});


app.listen(3000, () => {
    console.log("Server starting on http://localhost:3000");
})