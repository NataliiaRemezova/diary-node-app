import Todo from '../data/model/todoModel.js';
import User from '../data/model/userModel.js';

export const getAllTodos = async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await Todo.find({ user: userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id).where({ user: req.user.id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTodo = async (req, res) => {
  const { text } = req.body;
  const completion = false;
  const userId = req.user.id;
  try {
    const newTodo = new Todo({ text, completion, user: userId });
    await newTodo.save();

    const user = await User.findById(userId);
    user.todos.push(newTodo._id);
    await user.save();

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, completion } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { text, completion },
      { new: true }
    ).where({ user: req.user.id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id).where({ user: req.user.id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    await User.findByIdAndUpdate(req.user.id, { $pull: { todos: todo._id } });
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
