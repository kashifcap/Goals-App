const asyncHandler = require("express-async-handler"); // error thrown in async functions are sent to the express/custom error handler
const Goal = require("../models/goalModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

const setGoal = asyncHandler(async (req, res, next) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please send a text");
  }
  const goal = await Goal.create({
    user: req.user.id,
    text: req.body.text,
  });
  res.status(200).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("No goal present!");
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("No goal present!");
  }
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
