import React, { useState } from "react";

const CreateTodo = ({ addTodo }) => {
	const [title, setTitle] = useState("");
	const [priority, setPriority] = useState("medium");
	const [dueDate, setDueDate] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title) return;
		addTodo({ title, priority, dueDate: dueDate || undefined });
		setTitle("");
		setPriority("medium");
		setDueDate("");
	};

	return (
		<form
				onSubmit={handleSubmit}
				className="p-5 mb-6 bg-white rounded-2xl shadow border border-gray-100"
			>
				<h2 className="text-xl font-semibold text-gray-900 mb-3">Add a task</h2>
				<div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="What do you need to do?"
						className="flex-grow min-w-0 px-3 py-3 border border-gray-200 rounded-xl bg-gray-50 placeholder:text-gray-400 transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
					/>
					<select
						value={priority}
						onChange={(e) => setPriority(e.target.value)}
						className="px-3 py-3 border border-gray-200 rounded-xl bg-white transition focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-auto"
					>
						<option value="high">High</option>
						<option value="medium">Medium</option>
						<option value="low">Low</option>
					</select>
					<input
						type="date"
						value={dueDate}
						onChange={(e) => setDueDate(e.target.value)}
						className="px-3 py-3 border border-gray-200 rounded-xl bg-white transition focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-auto"
						aria-label="Due date"
					/>
					<button
						type="submit"
						className="px-5 py-3 text-white rounded-xl shadow-sm bg-gradient-to-tr from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:translate-y-px transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 w-full sm:w-auto"
					>
						Add
					</button>
				</div>
			</form>
	);
};

export default CreateTodo;
