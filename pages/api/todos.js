// pages/api/todos.js
import connectDB from "../../db";
import Todo from "../../models/Todo";

connectDB();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const todos = await Todo.find({});
        res.status(200).json(todos);
      } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
      }
      break;
    case "POST":
      try {
        const { title } = req.body;
        const newTodo = new Todo({ title });
        await newTodo.save();
        res.status(201).json(newTodo);
      } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
      }
      break;
    case "PUT":
      try {
        const { id } = req.query;
        const { completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
          id,
          { completed },
          { new: true }
        );
        res.status(200).json(updatedTodo);
      } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
      }
      break;
    case "DELETE":
      try {
        const { id } = req.query;
        await Todo.findByIdAndRemove(id); // Use findByIdAndRemove to delete the todo
        res.status(200).json({ message: "Todo deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
