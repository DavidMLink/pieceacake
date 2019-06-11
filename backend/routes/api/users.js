const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const config = require("config");
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");

// CRUD

// CREATE

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// END OF CREATE

// READ

// @route    GET api/users/me
// @desc     Find user
// @access   Private

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findOne({ user: req.user.id }).populate(
      "name",
      "email",
      "avatar"
    );

    if (!user) {
      return res.status(400).json({ msg: "There is no user for this user" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/users
// @desc     Find all users
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().populate("name", "email", "avatar");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// END OF READ

// UPDATE

// @route    PUT api/users
// @desc     UPDATE user
// @access   Private
router.put("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, avatar, password } = req.body;

  const userFields = {};
  // userFields.user = req.user.id;
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (avatar) userFields.avatar = avatar;
  if (password) userFields.password = password;

  try {
    let user = await User.findOne({ user: req.user.id });

    if (user) {
      // Update
      user = await User.findOneAndUpdate(
        { user: req.user.id },
        { $set: userFields },
        { new: true }
      );

      return res.json(user);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// DELETE

// @route    DELETE api/users
// @desc     Delete user
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//END OF CRUD

module.exports = router;
