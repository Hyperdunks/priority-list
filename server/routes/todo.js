import { Router } from "express";
import { todoModel } from "../db.js";
import auth from "../auth.js";

const todoRouter = Router();

todoRouter.use(auth.userAuth);

todoRouter.get("/", async (req, res) => {
  try {
    const todos = await todoModel.find({ username: req.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

todoRouter.post("/", async (req, res) => {
  try {
    const { title, priority } = req.body;
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({ message: "Title is required" });
    }
    const allowedPriorities = ["low", "medium", "high"];
    if (priority && !allowedPriorities.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority" });
    }
    const newTodo = await todoModel.create({
      title,
      priority,
      username: req.userId,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

todoRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await todoModel.findOneAndDelete({ _id: id, username: req.userId });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Toggle completion
todoRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    if (typeof completed !== "boolean") {
      return res.status(400).json({ message: "completed must be a boolean" });
    }
    const updated = await todoModel.findOneAndUpdate(
      { _id: id, username: req.userId },
      { $set: { completed } },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updated);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { todoRouter };