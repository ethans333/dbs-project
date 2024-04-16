const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());


// This middleware will log every request to the console
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
//   next(); // Pass the request to the next middleware/route handler
// });

/*

  Events

*/

/*

  Events

*/

// Route to get all events
app.get("/api/events", (req, res) => {
  db.query("SELECT * FROM events", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving events: " + err.message);
    } else {
      res.send(result);
    }
  });
});


// Route to create a new event
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

  let rsoIdForInsert = eventType.toLowerCase() === 'rso event' ? associated_id : null;

  // Create the event with potential rso_id included
  db.query(
    "INSERT INTO events (event_id, time, description, ename, rso_id) VALUES (?, ?, ?, ?, ?)",
    [event_id, time, description, ename, rsoIdForInsert],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error when inserting event: " + err.message);
        return;
      }
      res.send(result);

      // Additional data insertion for location and specific event types
      addEventToLocationAndTypeTables(event_id, location_id, eventType, associated_id);
    }
  );
});

function addEventToLocationAndTypeTables(event_id, location_id, eventType, associated_id) {
  // Add event to location
  db.query(
    "INSERT INTO events_at_location (location_id, event_id) VALUES (?, ?)",
    [location_id, event_id],
    (err) => {
      if (err) {
        console.log("Error adding event to location: " + err.message);
      }
    }
  );

  // Add the event based on event type to appropriate table
  switch (eventType.toLowerCase()) {
    case "rso event":
      db.query(
        "INSERT INTO rso_events_owns (rso_id, event_id) VALUES (?, ?)",
        [associated_id, event_id],
        (err) => {
          if (err) {
            console.log("Error linking RSO to event: " + err.message);
          }
        }
      );
      break;
    case "private event":
      db.query(
        "INSERT INTO private_events_creates (creator_id, event_id) VALUES (?, ?)",
        [associated_id, event_id],
        (err) => {
          if (err) {
            console.log("Error creating private event: " + err.message);
          }
        }
      );
      break;
    case "public event":
      db.query(
        "INSERT INTO public_events_creates (creator_id, event_id) VALUES (?, ?)",
        [associated_id, event_id],
        (err) => {
          if (err) {
            console.log("Error creating public event: " + err.message);
          }
        }
      );
      break;
    default:
      console.log("Error: Invalid event type specified.");
      break;
  }
}

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
        res.send("Event updated successfully.");
      }
    }
  );
});


// Route to delete an event
// Route to delete an event
// app.delete("/api/events/:id", async (req, res) => {
//   const eventId = req.params.id;
//   // Start a database transaction
//   db.beginTransaction(async (err) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send("Error starting transaction: " + err.message);
//     }
    
//     try {
//       // Delete any comments associated with the event
//       await new Promise((resolve, reject) => {
//         db.query("DELETE FROM comments WHERE event_id = ?", [eventId], (err, result) => {
//           if (err) return reject(err);
//           resolve(result);
//         });
//       });

//       // Delete any references in private_events_creates
//       await new Promise((resolve, reject) => {
//         db.query("DELETE FROM private_events_creates WHERE event_id = ?", [eventId], (err, result) => {
//           if (err) return reject(err);
//           resolve(result);
//         });
//       });

//       // Delete any references in public_events_creates
//       await new Promise((resolve, reject) => {
//         db.query("DELETE FROM public_events_creates WHERE event_id = ?", [eventId], (err, result) => {
//           if (err) return reject(err);
//           resolve(result);
//         });
//       });

//       // Delete any references in rso_events_owns
//       await new Promise((resolve, reject) => {
//         db.query("DELETE FROM rso_events_owns WHERE event_id = ?", [eventId], (err, result) => {
//           if (err) return reject(err);
//           resolve(result);
//         });
//       });

//       // Now it's safe to delete the event itself
//       await new Promise((resolve, reject) => {
//         db.query("DELETE FROM events WHERE event_id = ?", [eventId], (err, result) => {
//           if (err) return reject(err);
//           resolve(result);
//         });
//       });

//       // If everything is successful, commit the transaction
//       db.commit((err) => {
//         if (err) {
//           throw err;
//         }
//         res.send("Event deleted successfully.");
//       });

//     } catch (err) {
//       // If any error occurs, rollback the transaction and send an error response
//       console.log(err);
//       db.rollback(() => {
//         res.status(500).send("Failed to delete event: " + err.message);
//       });
//     }
//   });
// });

app.delete("/api/events/:id", async (req, res) => {
  const eventId = req.params.id;
  db.beginTransaction(async (err) => {
    if (err) {
      console.error("Transaction start error:", err);
      return res.status(500).send("Error starting transaction: " + err.message);
    }

    try {
      // Check if the event exists
      const eventExists = await new Promise((resolve, reject) => {
        db.query("SELECT 1 FROM events WHERE event_id = ?", [eventId], (err, results) => {
          if (err) return reject(err);
          resolve(results.length > 0);
        });
      });

      if (!eventExists) {
        throw new Error("Event does not exist");
      }

      // Proceed with deleting dependencies
      const tablesToDeleteFrom = ['comments', 'private_events_creates', 'public_events_creates', 'rso_events_owns'];
      for (let table of tablesToDeleteFrom) {
        await new Promise((resolve, reject) => {
          db.query(`DELETE FROM ${table} WHERE event_id = ?`, [eventId], (err, result) => {
            if (err) {
              console.error(`Error deleting from ${table}:`, err);
              return reject(err);
            }
            console.log(`Deleted ${result.affectedRows} rows from ${table}`);
            resolve();
          });
        });
      }

      // Delete the event itself
      await new Promise((resolve, reject) => {
        db.query("DELETE FROM events WHERE event_id = ?", [eventId], (err, result) => {
          if (err) {
              console.error("Error deleting event:", err);
              return reject(err);
          }
          console.log(`Deleted event ${eventId}: ${result.affectedRows} rows affected`);
          resolve();
        });
      });

      // Commit the transaction
      db.commit((err) => {
        if (err) throw err;
        res.send("Event deleted successfully.");
      });
    } catch (err) {
      // Rollback the transaction if any error occurs
      console.error("Deletion error:", err);
      db.rollback(() => {
        res.status(500).send(`Failed to delete event: ${err.message || err}`);
      });
    }
  });
});





/*

  Comments

*/

// Route to add a comment
// Route to update a comment
// app.post("/api/comments/:event_id", (req, res) => {
//   const { event_id } = req.params;
//   const { user_id, text, date } = req.body;
//   const comment_id = Math.floor(Math.random() * Date.now());

//   console.log("Inserting comment:", { comment_id, event_id, user_id, text, date });

//   db.query(
//     "INSERT INTO comments (comment_id, event_id, user_id, text, number_of_ratings, total_rating, timestamp) VALUES (?, ?, ?, ?, 0, 0, ?)",
//     [comment_id, event_id, user_id, text, date],
//     (err, result) => {
//       if (err) {
//         console.error("Error inserting comment:", err);
//         return res.status(500).send("Error inserting comment: " + err.message);
//       }
//       console.log("Comment inserted successfully:", result);
//       res.send(result);
//     }
//   );
// });

function generateLargeRandom() {
  // Generate a random number between 1 and a very large number
  return Math.floor(Math.random() * 1000000000000) + 1;
}

app.post("/api/comments/:event_id", (req, res) => {
  const event_id = req.params.event_id;
  const { user_id, text, date } = req.body;
  const comment_id = generateLargeRandom(); // Use the function to generate a comment_id

  db.query(
      "INSERT INTO comments (comment_id, event_id, user_id, text, number_of_ratings, total_rating, timestamp) VALUES (?, ?, ?, ?, 0, 0, ?)",
      [comment_id, event_id, user_id, text, date],
      (err, result) => {
          if (err) {
              if (err.code === 'ER_DUP_ENTRY') {
                  // Attempt to insert again with a new random number if a duplicate entry error occurs
                  const newCommentId = generateLargeRandom();
                  db.query(
                      "INSERT INTO comments (comment_id, event_id, user_id, text, number_of_ratings, total_rating, timestamp) VALUES (?, ?, ?, ?, 0, 0, ?)",
                      [newCommentId, event_id, user_id, text, date],
                      (err2, result2) => {
                          if (err2) {
                              console.log(err2);
                              res.status(500).send("Error inserting comment after retry: " + err2.message);
                          } else {
                              res.send(result2);
                          }
                      }
                  );
              } else {
                  console.log(err);
                  res.status(500).send("Error inserting comment: " + err.message);
              }
          } else {
              res.send(result);
          }
      }
  );
});

// Delete comments api
// Route to delete a comment by ID
app.delete("/api/comments/:comment_id", (req, res) => {
  const comment_id = req.params.comment_id;
  db.query(
    "DELETE FROM comments WHERE comment_id = ?",
    [comment_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Failed to delete comment: " + err.message);
      } else {
        res.send("Comment deleted successfully.");
      }
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
// api for editing comments
// Route to edit a comment by ID
app.put("/api/comments/:comment_id", (req, res) => {
  const comment_id = req.params.comment_id;
  const { newContent } = req.body;

  db.query(
    "UPDATE comments SET content = ? WHERE comment_id = ?",
    [newContent, comment_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating comment");
        return;
      }
      res.send("Comment updated successfully.");
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

// Route to delete an RSO by ID
app.delete("/api/rso/:rso_id", (req, res) => {
  const rso_id = req.params.rso_id;
  db.query(
    "DELETE FROM rso WHERE rso_id = ?",
    [rso_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Failed to delete RSO: " + err.message);
      } else {
        res.send("RSO deleted successfully.");
      }
    }
  );
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
console.log("Setting up routes");
app.delete("/api/rso/:rso_id", (req, res) => {
  console.log("Delete route hit for RSO ID:", req.params.rso_id);
  const rso_id = req.params.rso_id;
  console.log("Attempting to delete RSO with ID:", rso_id);
  db.query(
    "DELETE FROM rso WHERE rso_id = ?",
    [rso_id],
    (err, result) => {
      if (err) {
        console.log("Error during RSO deletion:", err);
        res.status(500).send("Failed to delete RSO: " + err.message);
      } else {
        console.log("Deletion successful, result:", result);
        res.send("RSO deleted successfully.");
      }
    }
  );
});

// Route to get all RSOs a user is in
app.delete("/api/user/leave-rso", (req, res) => {
  const { user_id, rso_id } = req.body;

  console.log("User ID:", user_id, "RSO ID:", rso_id);

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


// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}/api`);
// });
