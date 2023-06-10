const router = require("express").Router();
const { 
  getAllTodos, 
  getATodo, 
  createATodo, 
  updateATodo, 
  deleteATodo 
} = require("../controllers/todos.controller");

const checkAuth = require("../middlewares/checkAuth.middleware");

router.get("/todos-all", checkAuth, getAllTodos);
router.get("/todo/:id", checkAuth, getATodo);
router.post("/todo/new", checkAuth, createATodo);
router.put("/todo/:id", checkAuth, updateATodo);
router.delete("/todo/:id", checkAuth, deleteATodo);

module.exports = router;
