const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
const submissions = [];

app.get("/", (req, res) => {
    res.render("index");
});
app.post("/submit", (req, res) => {
    const { name, email, phone, age, message } = req.body;

    // Server-side validation
    if (!name || !email || !phone || !age || !message) {
        return res.render("error", { error: "All fields are required!" });
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.render("error", { error: "Invalid email format!" });
    }

    if (!/^\d{10}$/.test(phone)) {
        return res.render("error", { error: "Phone number must be 10 digits!" });
    }

    if (isNaN(age) || age < 18) {
        return res.render("error", { error: "Age must be a number and at least 18!" });
    }

    const userData = { name, email, phone, age, message };
    submissions.push(userData);

    res.render("result", { userData, submissions });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});












