const express = require("express");

let configRoutes = require("./routes");
let app = express();

configRoutes(app);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
