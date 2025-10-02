import React from 'react';

const TodoItem = ({ todo, deleteTodo, toggleCompleted }) => {
  const due = todo?.dueDate ? new Date(todo.dueDate) : null;
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isOverdue = !!due && !todo.completed && due < startOfToday;
  const isScheduled = !!due && due > startOfToday && !todo.completed;
  return (
    <div className={`group flex items-center justify-between p-4 my-3 rounded-2xl border transition ${todo.completed ? 'bg-green-50/60 border-green-200' : isOverdue ? 'bg-rose-50/60 border-rose-200' : 'bg-white border-gray-100'} shadow-sm hover:shadow-md`}>
      <div className="flex items-center gap-3 min-w-0">
        <input
          id={`todo-${todo._id}`}
          type="checkbox"
          className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
          checked={!!todo.completed}
          onChange={(e) => toggleCompleted(todo._id, e.target.checked)}
        />
        <div className="min-w-0">
          <label htmlFor={`todo-${todo._id}`} className={`block text-base sm:text-lg truncate ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {todo.title}
          </label>
          {due && (
            <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
              <span>Due {due.toLocaleDateString()}</span>
              {isOverdue && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M12 9v4" /><path d="M12 17h.01" /><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /></svg>
                  Overdue
                </span>
              )}
              {isScheduled && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9" /><path d="M12 7v5l3 3" /></svg>
                  Scheduled
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center shrink-0">
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 border border-gray-200"
          title={`${todo.priority} priority`}
          aria-label={`${todo.priority} priority`}
        >
          <span
            className={`block h-2.5 w-2.5 rounded-full ${
              todo.priority === 'high'
                ? 'bg-red-500'
                : todo.priority === 'medium'
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
          />
        </span>
        <button
          onClick={() => deleteTodo(todo._id)}
          className="ml-3 inline-flex items-center justify-center w-9 h-9 rounded-full text-rose-600 hover:text-white hover:bg-rose-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 transition"
          aria-label="Delete todo"
          title="Delete"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M3 6h18" />
            <path d="M8 6v-.5A2.5 2.5 0 0 1 10.5 3.5h3A2.5 2.5 0 0 1 16 5.5V6" />
            <path d="M6 6v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;