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
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSignout}
        >
          Sign Out
        </button>
      </div>
      <CreateTodo addTodo={addTodo} />
      <div>
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} deleteTodo={deleteTodo} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
