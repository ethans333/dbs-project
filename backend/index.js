const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

// Route to get all posts
app.get("/api/events", (req, res) => {
  db.query("SELECT * FROM events", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to create a new post
app.post("/api/events", (req, res) => {
  const { event_id, time, description } = req.body;
  db.query(
    "INSERT INTO events (event_id, time, description) VALUES (?, ?, ?)",
    [event_id, time, description],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api`);
});
