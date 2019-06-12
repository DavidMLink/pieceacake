const express = require("express");
const request = require("request");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
// const config = require("config");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");

// CRUD

// CREATE

// @route    POST api/users
// @desc     Register user
// @access   Public
exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm"
    });

    user = new User({
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
};

// END OF CREATE

// READ

// @route    GET api/users/me
// @desc     Find user
// @access   Private

// exports.findUser = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ user: req.user.id }).populate(
//       "name",
//       "email",
//       "avatar"
//     );

//     if (!user) {
//       return res.status(400).json({ msg: "There is no user for this user" });
//     }

//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

// // @route    GET api/users
// // @desc     Find all users
// // @access   Private
exports.findAllUsers = async (req, res, next) => {
  try {
    // const users = await User.find().populate("name", "email", "avatar");
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// // END OF READ

// // UPDATE

// // @route    PUT api/users
// // @desc     UPDATE user
// // @access   Private
exports.updateUser = async (req, res, next) => {
  console.log("1");
  console.log(req.user.id);
  const idFromToken = req.user.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("2");
  const { name, email, avatar, password } = req.body;
  console.log("3");
  const userFields = {};
  // userFields.user = req.user.id;
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (avatar) userFields.avatar = avatar;
  if (password) userFields.password = password;
  console.log("4");
  try {
    let user = await User.findById({ user: req.user.id });
    console.log("5");
    // console.log(user);
    console.log(user.name);
    console.log(user.email);
    console.log(user.avatar);
    console.log(user.password);
    if (user) {
      console.log("6");
      // Update
      user = await User.findOneAndUpdate(
        { user: idFromToken },
        { $set: userFields },
        { new: true }
      );
      console.log("7");

      return res.json(user);
    }
  } catch (err) {
    console.log("8");
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// // DELETE

// // @route    DELETE api/users
// // @desc     Delete user
// // @access   Private
exports.deleteUser = async (req, res) => {
  try {
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// //END OF CRUD

// // module.exports = router;
