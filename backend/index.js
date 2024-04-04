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
  const {
    event_id,
    time,
    description,
    ename,
    eventType,
    associated_id,
    location_id,
  } = req.body;

  // Create the event
  db.query(
    "INSERT INTO events (event_id, time, description, ename) VALUES (?, ?, ?, ?)",
    [event_id, time, description, ename],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );

  // Add event to location
  db.query(
    "INSERT INTO events_at_location (location_id, event_id) VALUES (?, ?)",
    [location_id, event_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );

  // Add the event based on event type to appropriate table
  switch (eventType.toLowerCase()) {
    case "rso event":
      db.query(
        "INSERT INTO rso_events_owns (rso_id, event_id) VALUES (?, ?)",
        [associated_id, event_id],
        (err, result) => {
          if (err) {
            console.log(err);
          }
        }
      );
      break;
    case "private event":
      db.query(
        "INSERT INTO private_events_creates (creator_id, event_id) VALUES (?, ?)",
        [associated_id, event_id],
        (err, result) => {
          if (err) {
            console.log(err);
          }
        }
      );
      break;
    case "public event":
      db.query(
        "INSERT INTO public_events_creates (creator_id, event_id) VALUES (?, ?)",
        [associated_id, event_id],
        (err, result) => {
          if (err) {
            console.log(err);
          }
        }
      );
      break;
    default:
      console.log("Error: Invalid event type.");
      break;
  }
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
  const { user_id, text, date } = req.body;
  const comment_id = Math.floor(Math.random() * Date.now());

  db.query(
    "INSERT INTO comments (comment_id, event_id, user_id, text, number_of_ratings, total_rating, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
    [comment_id, event_id, user_id, text, 0, 0, date],
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

// Route to add rating to a comment
app.put("/api/comments/rating/:comment_id", (req, res) => {
  const comment_id = req.params.comment_id;
  const { rating } = req.body;

  db.query(
    "UPDATE comments SET number_of_ratings = number_of_ratings + 1, total_rating = total_rating + ? WHERE comment_id = ?",
    [rating, comment_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating rating");
        return;
      }
      res.send(result);
    }
  );
});

/*

  RSOs

*/

// Route to create a new RSO
app.post("/api/rso/:rso_id", (req, res) => {
  const rso_id = req.params.rso_id;
  const { name } = req.body;
  db.query(
    "INSERT INTO rso (rso_id, name) VALUES (?, ?)",
    [rso_id, name],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to get all RSOs
app.get("/api/rso", (req, res) => {
  db.query("SELECT * FROM rso", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

/*

  Location

*/

// Route to create a new location
app.post("/api/location/:location_id", (req, res) => {
  const location_id = req.params.location_id;
  const { lname, address, longitude, latitude } = req.body;
  db.query(
    "INSERT INTO location (location_id, lname, address, longitude, latitude) VALUES (?, ?, ?, ?, ?)",
    [location_id, lname, address, longitude, latitude],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to get all locations
app.get("/api/location", (req, res) => {
  db.query("SELECT * FROM location", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api`);
});

/*

  User

*/

// Route to create a new user
app.post("/api/user/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const { username, password } = req.body;
  db.query(
    "INSERT INTO users (id, username, password) VALUES (?, ?, ?)",
    [user_id, username, password],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to verify a users credentials
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to reset a users username
app.put("/api/user/change-username/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const { username } = req.body;

  db.query(
    "UPDATE users SET username = ? WHERE id = ?",
    [username, user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to reset a users password
app.put("/api/user/change-password/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const { password } = req.body;

  db.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [password, user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to delete a user
app.delete("/api/user/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  db.query("DELETE FROM users WHERE id = ?", [user_id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get user type
app.get("/api/user/type/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  let userType = 3;

  try {
    const superAdminQuery = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM super_admins WHERE id = ?",
        [user_id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    if (superAdminQuery.length > 0) {
      userType = 1; // SUPER_ADMIN
    }

    const adminQuery = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM admins WHERE id = ?",
        [user_id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    if (adminQuery.length > 0) {
      userType = 2; // ADMIN
    }

    res.send({
      userType: userType,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route for user to join an RSO
app.post("/api/user/join-rso/:user_id/:rso_id", (req, res) => {
  const user_id = req.params.user_id;
  const rso_id = req.params.rso_id;

  db.query(
    "INSERT INTO users_joins_rsos (user_id, rso_id) VALUES (?, ?)",
    [user_id, rso_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route for user to leave an RSO
app.delete("/api/user/leave-rso/:user_id/:rso_id", (req, res) => {
  const user_id = req.params.user_id;
  const rso_id = req.params.rso_id;

  db.query(
    "DELETE FROM users_joins_rsos WHERE user_id = ? AND rso_id = ?",
    [user_id, rso_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to get all RSOs a user is in
app.get("/api/user/rso/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  db.query(
    "SELECT rso_id FROM users_joins_rsos WHERE user_id = ?",
    [user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to get all admins
app.get("/api/admin", (req, res) => {
  db.query(
    "SELECT u.id, u.username FROM users u JOIN admins a ON u.id = a.id",
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.send(result);
    }
  );
});

// Route to get all users that arent admins
app.get("/api/user/not-admin", (req, res) => {
  db.query(
    "SELECT id, username FROM users WHERE NOT EXISTS (SELECT 1 FROM admins WHERE admins.id = users.id) AND NOT EXISTS (SELECT 1 FROM super_admins WHERE super_admins.id = users.id)",
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.send(result);
    }
  );
});

// Route to add an admin
app.post("/api/admin/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  db.query("INSERT INTO admins (id) VALUES (?)", [user_id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to delete an admin
app.delete("/api/admin/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  db.query("DELETE FROM admins WHERE id = ?", [user_id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
