import React from 'react';

const TodoItem = ({ todo, deleteTodo }) => {
  return (
    <div className="flex items-center justify-between p-2 my-2 bg-white rounded-lg shadow">
      <span className="text-lg text-gray-800">{todo.title}</span>
      <div className="flex items-center">
        <span className={`px-2 py-1 text-sm text-white rounded-full ${todo.priority === 'high' ? 'bg-red-500' : todo.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
          {todo.priority}
        </span>
        <button onClick={() => deleteTodo(todo._id)} className="ml-4 px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;