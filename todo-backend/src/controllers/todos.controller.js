// imports the todo model
const Todo = require("../models/todos.model");
// imports the user model
const User = require("../models/users.model");

// make a controller for get all todos
exports.getAllTodos = async (req, res) => {
  try {
    if (req.user) {
      const { userLogin } = req.user;
      const user = await User.findOne({ username: userLogin });

      if (user) {
        const todoIds = user.todos.map(todo => todo._id);
        const todos = [];

        for (let todoId of todoIds) {
          const todo = await Todo.findById(todoId);
          todos.push(todo);
        }

        todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json({ todos });
      } else {
        res.status(500).json({ error: "User is not authorized!" });
      }
    } else {
      res.status(500).json({ error: "User is not authorized!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// make a controller for get a todo
exports.getATodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;

    if (req.user) {
      const { userLogin } = req.user;
      const user = await User.findOne({ username: userLogin });

      if (user) {
        if (user.todos.map(todo => todo.toString()).includes(todoId)) {
          const todo = await Todo.findById(todoId);
          res.json({ todo })
        } else {
          res.status(500).json({ error: "Todo is not exists!" });
        }
      } else {
        res.status(500).json({ error: "User is not authorized!" });
      }
    } else {
      res.status(500).json({ error: "User is not authorized!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// make a controller for create a todo
exports.createATodo = async (req, res) => {
  try {
    if (req.user) {
      const { userLogin } = req.user;
      const user = await User.findOne({ username: userLogin });
  
      if (user) {
        const newTodo = new Todo(req.body);
        await newTodo.save();
  
        const todos = user.todos || [];
        user.todos = [ ...todos, newTodo ];
        const updatedUser = await user.save();
        res.json({ message: "Todo created!", updatedUser });
      } else {
        res.status(500).json({ error: "User is not authorized!" });
      }
    } else {
      res.status(500).json({ error: "User is not authorized!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// make a controller for update a todo
exports.updateATodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    if (req.user) {
      const { userLogin } = req.user;
      const user = await User.findOne({ username: userLogin });

      if (user) {
        if (user.todos.map(todo => todo.toString()).includes(todoId)) {
          const todo = await Todo.findByIdAndUpdate(todoId, req.body, { new: true, runValidators: true });
          res.json({ todo });
        } else {
          res.status(500).json({ error: "Todo is not exists!" });
        }
      } else {
        res.status(500).json({ error: "User is not authorized!" });
      }
    } else {
      res.status(500).json({ error: "User is not authorized!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// make a controller for delete a todo
exports.deleteATodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    if (req.user) {
      const { userLogin } = req.user;
      const user = await User.findOne({ username: userLogin });

      if (user) {
        if (user.todos.map(todo => todo.toString()).includes(todoId)) {
          const todos = user.todos
            .map(todo => todo.toString())
            .filter(todo => todo !== todoId);
          
          user.todos = todos;
          await user.save();
          const todo = await Todo.findByIdAndDelete(todoId);
          res.json({ todo });
        } else {
          res.status(500).json({ error: "Todo is not exists!" });
        }
      } else {
        res.status(500).json({ error: "User is not authorized!" });
      }
    } else {
      res.status(500).json({ error: "User is not authorized!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
