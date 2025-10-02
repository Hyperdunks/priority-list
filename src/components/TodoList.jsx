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

  const overdueCount = todos.filter((t) => {
    if (!t.dueDate || t.completed) return false;
    const due = new Date(t.dueDate);
    const today = new Date();
    return due < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }).length;

  const handleSignout = () => {
    navigate("/signout");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6"k >
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Your Tasks</h1>
          <p className="text-sm text-gray-500">Prioritize. Focus. Finish.</p>
        </div>
        <button
          className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-xl shadow-sm hover:shadow transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          onClick={handleSignout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path d="M15 3h-6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
            <path d="M10 12h9" />
            <path d="M17 9l3 3-3 3" />
          </svg>
          <span>Sign Out</span>
        </button>
      </div>
      {overdueCount > 0 && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 px-3 py-2 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
          <span>
            {overdueCount} {overdueCount === 1 ? 'task is' : 'tasks are'} overdue
          </span>
        </div>
      )}
      <CreateTodo addTodo={addTodo} />
      <div>
        {todos.length === 0 ? (
          <div className="text-center py-14 border border-dashed border-gray-200 rounded-2xl bg-white">
            <div className="text-lg font-medium text-gray-800 mb-1">No tasks yet</div>
            <p className="text-sm text-gray-500">Add your first task to get started.</p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} deleteTodo={deleteTodo} toggleCompleted={toggleCompleted} />
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;
