const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const generator = require("generate-password");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

let password;

app.get("/", (req, res) => {
    res.render("index", { password: password });
});

app.post("/", (req, res) => {
    try {
        password = generator.generate({
            length: req.body.length,
            numbers: req.body.numbers ? true : false,
            uppercase: req.body.uppercase ? true : false,
            lowercase: req.body.lowercase ? true : false,
            symbols: req.body.symbols ? true : false,
        });
        res.redirect("/")
    } catch (error) {
        console.log("At least one setting must be selected");
        res.redirect("/");
    }
});

app.all("*", (req, res) => {
    res.status(404).send("<h1>404 - Oops! you seem to be lost</h1>");
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})