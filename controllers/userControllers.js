const userModel = require("../models/userModel");
//======== JWT token ==========
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ascynHandler = require("express-async-handler");

//@des => register user
//@route => /api/user
//@access => public

const registerUser = ascynHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all feilds");
  }
  //======= if exits ===========
  const checkExit = await userModel.findOne({ email });
  if (checkExit) {
    res.status(400);
    throw new Error("Email aready exists");
  }
  //======= Hash password ======
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //===========  Accepting Object  ==========
  const userObject = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  if (userObject) {
    res.status(201).json({
      _id: userObject.id,
      name: userObject.name,
      email: userObject.email,
      token: generateToken(userObject.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@des => Login user user
//@route => /api/user/login
//@access => public
const loginUser = ascynHandler(async (req, res) => {
  const { email, password } = req.body;

  //============ check for email ==========
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentails");
  }
});

//@des => get user
//@route => /api/user/me
//@access => public
const getMe = ascynHandler(async (req, res) => {
  const { name, id, email } = await userModel.findById(req.user.id);
  res.status(200).json({
    name,
    _id: id,
  });
});

// Generate JWT token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
