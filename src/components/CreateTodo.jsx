import React, { useState } from "react";

const CreateTodo = ({ addTodo }) => {
	const [title, setTitle] = useState("");
	const [priority, setPriority] = useState("medium");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title) return;
		addTodo({ title, priority });
		setTitle("");
		setPriority("medium");
	};

	return (
    <form
            onSubmit={handleSubmit}
            className="p-5 mb-6 bg-white rounded-2xl shadow border border-gray-100"
        >
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Add a task
            </h2>
            <div className="flex items-center gap-3">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What do you need to do?"
                    className="flex-grow p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <button
                    type="submit"
                    className="px-5 py-3 text-white bg-orange-500 rounded-xl hover:bg-orange-600"
                >
                    Add
                </button>
            </div>
        </form>
	);
};

export default CreateTodo;
