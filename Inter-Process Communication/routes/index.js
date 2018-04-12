const people = require("./people");

const constructorMethod = (app) => {
    app.use("/api/people", people);

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
};

module.exports = constructorMethod;