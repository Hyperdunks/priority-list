import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreateTodo from "./CreateTodo";
import TodoItem from "./TodoItem";

function TodoList() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/todo", {
          headers: { token },
        });
        setTodos(response.data);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/todo", todo, {
        headers: { token },
      });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const toggleCompleted = async (id, completed) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.patch(`/api/todo/${id}`, { completed }, {
        headers: { token },
      });
      setTodos(todos.map((t) => (t._id === id ? data : t)));
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/todo/${id}`, {
        headers: { token },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleSignout = () => {
    navigate("/signout");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Your Tasks</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg"
          onClick={handleSignout}
        >
          Sign Out
        </button>
      </div>
      <CreateTodo addTodo={addTodo} />
      <div>
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} deleteTodo={deleteTodo} toggleCompleted={toggleCompleted} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
