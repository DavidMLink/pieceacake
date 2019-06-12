const express = require("express");
const auth = require("../../middleware/auth");

const UserController = require("../../controllers/user");

const { check, validationResult } = require("express-validator/check");

const router = express.Router();

router.post(
  "/signup",
  [
    [
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 })
    ]
  ],
  UserController.createUser
);

// router.get("/me", auth, UserController.findUser);

router.get("/", auth, UserController.findAllUsers);

router.put(
  "/",
  auth,
  [
    [
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 }),
      check("name", "Please include a name")
        .not()
        .isEmpty(),
      check("avatar", "Please include a avatar")
        .not()
        .isEmpty()
    ]
  ],
  UserController.updateUser
);

router.delete("/", auth, UserController.deleteUser);

// router.post("/login", UserController.userLogin);

module.exports = router;
