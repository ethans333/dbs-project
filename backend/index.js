const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

/*

  Events

*/

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

// Route to get a specific event by ID
app.get("/api/events/:id", (req, res) => {
  const eventId = req.params.id;
  db.query(
    "SELECT * FROM events WHERE event_id = ?",
    [eventId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        if (result.length > 0) {
          res.send(result[0]);
        } else {
          res.status(404).send("Event not found");
        }
      }
    }
  );
});

// Route to update an existing event
app.put("/api/events/:id", (req, res) => {
  const eventId = req.params.id;
  const { time, description } = req.body;
  db.query(
    "UPDATE events SET time = ?, description = ? WHERE event_id = ?",
    [time, description, eventId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send(result);
      }
    }
  );
});

// Route to delete an event
app.delete("/api/events/:id", (req, res) => {
  const eventId = req.params.id;
  db.query(
    "DELETE FROM events WHERE event_id = ?",
    [eventId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send(result);
      }
    }
  );
});

/*

  Comments

*/

// Route to add a comment
app.post("/api/comments/:event_id", (req, res) => {
  const event_id = req.params.event_id;
  const { user_id, text, rating, date } = req.body;
  db.query(
    "INSERT INTO comments (event_id, user_id, text, rating, timestamp) VALUES (?, ?, ?, ?, ?)",
    [event_id, user_id, text, rating, date],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to get all comments for an event
app.get("/api/comments/:event_id", (req, res) => {
  const event_id = req.params.event_id;
  db.query(
    "SELECT * FROM comments WHERE event_id = ?",
    [event_id],
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
