import express from "express";
import pool from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/", async (req, res) => {
    res.send("Hello");
});
app.get("/api/jatekok", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * from jatekok WHERE raktaron = 1 ORDER by ar");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Failed to fetch games:", error);
        res.status(500).json({ hiba: "Adatbázis hiba történt!" });
    }
});

app.get("/api/jatekok/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * from jatekok WHERE id =  ? ", id);
        if (rows.length == 0) {
            res.status(404).json({ hiba: "A keresett játék nem található." });
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (error) {
        res.status(500).json({ hiba: "Adatbázis hiba történt!" });
    }
});

app.listen(PORT, () => {
    console.log(` A szerver fut: http://localhost:${PORT}`);
});
