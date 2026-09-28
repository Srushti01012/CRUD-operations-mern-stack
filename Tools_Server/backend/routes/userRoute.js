const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModels');

const router = express.Router();


// ==========================
// CREATE USER
// POST /register
// ==========================

router.post("/register", async (req, res) => {

  const { name, email, age } = req.body;

  try {

    const userAdded = await User.create({
      name: name,
      email: email,
      age: age
    });

    res.status(201).json(userAdded);

  } catch (error) {

    console.log(error);

    res.status(400).json({
      error: error.message
    });

  }

});


// ==========================
// GET ALL USERS
// GET /read
// ==========================

router.get("/read", async (req, res) => {

  try {

    const showAll = await User.find();

    res.status(200).json(showAll);

  } catch (error) {

    console.log(error);

    res.status(400).json({
      error: error.message
    });

  }

});


// ==========================
// GET SINGLE USER
// GET /:id
// ==========================

router.get("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const singleUser = await User.findById(id);

    res.status(200).json(singleUser);

  } catch (error) {

    console.log(error);

    res.status(400).json({
      error: error.message
    });

  }

});


// ==========================
// DELETE USER
// DELETE /:id
// ==========================

router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const deleteUser = await User.findByIdAndDelete(id);

    res.status(200).json(deleteUser);

  } catch (error) {

    console.log(error);

    res.status(400).json({
      error: error.message
    });

  }

});


// ==========================
// UPDATE USER
// PATCH /:id
// ==========================

router.patch("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const updateUser = await User.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true
      }
    );

    res.status(200).json(updateUser);

  } catch (error) {

    console.log(error);

    res.status(400).json({
      error: error.message
    });

  }

});


module.exports = router;