const express = require("express");
const router = express.Router();
const StatusCodes = require("http-status-codes").StatusCodes;
const userController = require("../controllers/userController.js");

// Create a new user
// POST /api/users
// Request body: { name: string, email: string }
router.post("/", (req, res) => {
  userController.createUser(req.body).then((response) => {
    return res.status(response.code).json(response.data);
  }).catch((error) => {
    return res.status(error.code).json({ message: error.data })
  })
});

// Get all users
// GET /api/users
router.get("/", (req, res) => {
  userController.getAllUsers().then((response) => {
    return res.status(response.code).json(response.data);
  }).catch((error) => {
    return res.status(error.code).json(error.data)
  })
})

// Get a user by id
router.get("/:id", (req, res) => {
  userController.getUserById(req.params.id).then((response) => {
    return res.status(response.code).json(response.data);
  }).catch((error) => {
    return res.status(error.code).send(error.data);
  });
});

// Get a user by email
router.get("/email/:email", (req, res) => {
  userController.getUserByEmail(req.params.email).then((response) => {
    return res.status(response.code).json(response.data);
  }).catch((error) => {
    return res.status(error.code).send(error.data);
  });
});

// Update a user by id
router.patch('/:id', (req, res) => {
  userController.findByIdAndUpdate(req.params.id, req.body).then((response) => {
    res.status(response.code).json(response.data)
  }).catch((error) => {
    res.status(error.code).send(error.data)
  })
})

// Delete a user by id
router.delete('/:id', (req, res) => {
  userController.deleteUserById(req.params.id).then((response) => {
    res.status(response.code).json(response.data)
  }).catch((error) => {
    res.status(error.code).send(error.data)
  })
})

// Delete all users
router.delete("/", (req, res) => {
  userController.deleteAllUsers().then((response) => {
    res.status(response.code).json(response.data);
  }).catch((error) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  });
});


router.post('/:id/addbalance', (req, res) => {
  userController.addBalanceById(req.params.id, req.body.amount).then((response) => {
    res.status(response.code).json(response.data)
  }).catch((error) => {
    res.status(error.code).send(error.data)
  })
})

module.exports = router;
