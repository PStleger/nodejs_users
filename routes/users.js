require("dotenv/config");
const express = require("express");
const router = express.Router();
const pool = require("../db");

router.use(express.json());

router
  .route("/:id")
  // GET  /:id one user (with the id)
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const singleUser = await pool.query("SELECT * FROM users WHERE id=$1", [
        id,
      ]);
      res.json(singleUser.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  })
  // PUT /:id  edit one user (with the id)
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const { first_name, last_name, age} = req.body;
      const editUser = await pool.query(
        "UPDATE users SET first_name=$1,last_name=$2,age=$3 WHERE id=$4 RETURNING *",
        [first_name, last_name, age, id]
      );
      res.json(editUser.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  })
  // DELETE  /:id one user (with the id)
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const deleteUser = await pool.query(
        "DELETE FROM users WHERE id=$1 RETURNING *",
        [id]
      );
      res.json(deleteUser.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  });

router
  .route("/")
  // GET all the users
  .get(async (req, res) => {
    try {
      const allUsers = await pool.query("SELECT * FROM users");
      res.json(allUsers.rows);
    } catch (error) {
      console.error(error.message);
    }
  })
  // POST create a new user
  .post(async (req, res) => {
    try {
      const { first_name, last_name, age, active } = req.body;
      const createUser = await pool.query(
        "INSERT INTO users (first_name, last_name, age, active) VALUES ($1,$2,$3,$4) RETURNING *",
        [first_name, last_name, age, active]
      );
      res.json(createUser.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  });

module.exports = router;
