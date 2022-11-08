express = require("express");
const router = express.Router();

const userController = require("../controllers/userController.js");

// Create a new user
// POST /api/users
// Request body: { name: string, email: string }
router.post("/", (req, res) => {
  userController
    .createUser(req.body)
    .then(() => {
      res.status(201).send("User created.");
    })
    .catch((error) => {
      if (error === "User name and email are required.") {
        res.status(400).send(error);
      } else if (error === "User with this email already exists.") {
        res.status(409).send(error);
      } else {
        res.status(500).send(error);
      }
    });
});

// Get all users
// GET /api/users
router.get("/", (req, res) => {
  userController.getAllUsers().then((users) => {
    res.status(200).send(users);
  });
});

// Get a user by id
router.get("/:id", (req, res) => {
  userController
    .getUserById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// // Update a user by id
// router.patch('/:id', (req, res) => {
//   User.findByIdAndUpdate(req.params.id, req.body).then(() => {
//     res.status(200).send('User updated.')
//   }).catch((error) => {
//     res.status(400).send(error)
//   })
// })

// // Delete a user by id
// router.delete('/:id', (req, res) => {
//   User.findByIdAndDelete(req.params.id).then(() => {
//     res.status(200).send('User deleted.')
//   }).catch((error) => {
//     res.status(400).send(error)
//   })
// })

// Delete all users
router.delete("/", (req, res) => {
  userController
    .deleteAllUsers()
    .then(() => {
      res.status(200).send("All users deleted.");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = router;
