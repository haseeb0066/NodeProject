const expressErrHandler = require("express-async-handler");
const Goal = require("../models/goalModal");
const User = require("../models/userModel");

// ======= get all list ==========
const getGoals = expressErrHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// ======= set all list ==========

const setGoals = expressErrHandler(async (req, res) => {
  //   console.log(req.body);
  if (!req.body.text) {
    res.status(400);
    // res.status(400).json({ message: "Please add text feild" });
    throw new Error("Please add text feild");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

// ======= update goal ==========

const updateGoals = expressErrHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal is not found");
  }

  const user = await User.findById(req.user.id);
  // ====  check for user  ====
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  if (goal.user?.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// ======= delete goal ==========

const deleteGoals = expressErrHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal is not found");
  }

  const user = await User.findById(req.user.id);
  // ====  check for user  ====
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  if (goal.user?.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  await goal.remove();
  res.status(200).json({ message: `delete goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
