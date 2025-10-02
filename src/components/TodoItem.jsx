import React from 'react';

const TodoItem = ({ todo, deleteTodo, toggleCompleted }) => {
  return (
    <div className={`flex items-center justify-between p-3 my-2 rounded-xl border transition ${todo.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100'} shadow-sm hover:shadow`}>
      <div className="flex items-center gap-3">
        <input
          id={`todo-${todo._id}`}
          type="checkbox"
          className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
          checked={!!todo.completed}
          onChange={(e) => toggleCompleted(todo._id, e.target.checked)}
        />
        <label htmlFor={`todo-${todo._id}`} className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {todo.title}
        </label>
      </div>
      <div className="flex items-center">
        <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${todo.priority === 'high' ? 'bg-red-500' : todo.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
          {todo.priority}
        </span>
        <button onClick={() => deleteTodo(todo._id)} className="ml-4 px-3 py-1.5 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600">Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;