require("dotenv/config");
const express = require("express");
const oRouter = express.Router();
const pool = require("../db");

oRouter.use(express.json());

oRouter
  .route("/:id")
  // GET  /:id one order (with the id)
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const singleOrder = await pool.query("SELECT * FROM orders WHERE id=$1", [
        id,
      ]);
      res.json(singleOrder.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  })
  // PUT /:id  edit one order (with the id)
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const { first_name, last_name, age} = req.body;
      const editOrder = await pool.query(
        "UPDATE Orders SET first_name=$1,last_name=$2,age=$3 WHERE id=$4 RETURNING *",
        [first_name, last_name, age, id]
      );
      res.json(editOrder.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  })
  // DELETE  /:id one order (with the id)
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const deleteOrder = await pool.query(
        "DELETE FROM Orders WHERE id=$1 RETURNING *",
        [id]
      );
      res.json(deleteOrder.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  });

oRouter
  .route("/")
  // GET all the Orders
  .get(async (req, res) => {
    try {
      const allOrders = await pool.query("SELECT * FROM Orders");
      res.json(allOrders.rows);
    } catch (error) {
      console.error(error.message);
    }
  })
  // POST create a new order
  .post(async (req, res) => {
    try {
      const { first_name, last_name, age, active } = req.body;
      const createOrder = await pool.query(
        "INSERT INTO orders (first_name, last_name, age, active) VALUES ($1,$2,$3,$4) RETURNING *",
        [first_name, last_name, age, active]
      );
      res.json(createOrder.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  });

module.exports = oRouter;
