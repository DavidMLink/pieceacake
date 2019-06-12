const express = require("express");
const auth = require("../../middleware/auth");

const AuthController = require("../../controllers/auth");

const { check, validationResult } = require("express-validator/check");

const router = express.Router();

router.get("/", auth, AuthController.authUser);

router.post(
  "/",
  [
    [
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 })
    ]
  ],
  AuthController.loginUser
);

module.exports = router;
