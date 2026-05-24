const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const db = new sqlite3.Database("./database/todo.db");

db.run(`
CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    priority TEXT DEFAULT 'Medium',
    completed INTEGER DEFAULT 0
)
`);

app.get("/", (req, res) => {
    db.all("SELECT * FROM todos", [], (err, rows) => {
        if (err) {
            throw err;
        }

        res.render("index", { todos: rows });
    });
});

app.post("/add", (req, res) => {
    const { task, priority } = req.body;

    db.run(
        "INSERT INTO todos (task, priority) VALUES (?, ?)",
        [task, priority],
        (err) => {
            if (err) {
                console.log(err);
            }

            res.redirect("/");
        }
    );
});

app.get("/delete/:id", (req, res) => {
    db.run(
        "DELETE FROM todos WHERE id = ?",
        [req.params.id],
        (err) => {
            if (err) {
                console.log(err);
            }

            res.redirect("/");
        }
    );
});

app.get("/edit/:id", (req, res) => {
    db.get(
        "SELECT * FROM todos WHERE id = ?",
        [req.params.id],
        (err, row) => {
            res.render("edit", { todo: row });
        }
    );
});

app.post("/update/:id", (req, res) => {
    const { task, priority } = req.body;

    db.run(
        "UPDATE todos SET task=?, priority=? WHERE id=?",
        [task, priority, req.params.id],
        (err) => {
            if (err) {
                console.log(err);
            }

            res.redirect("/");
        }
    );
});


app.get("/complete/:id", (req, res) => {

    db.run(
        "UPDATE todos SET completed = 1 WHERE id = ?",
        [req.params.id],
        (err) => {

            if (err) {
                console.log(err);
            }

            res.redirect("/");
        }
    );

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});