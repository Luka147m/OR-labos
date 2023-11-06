const express = require("express");
const app = express();

const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Gradovi",
    password: "admin",
    port: 5432,
});

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(`<html><body><h1>Server</h1></body></html>`);
})

app.listen(8080, () => {
    console.log("Server pokrenut na portu 8080");
});
