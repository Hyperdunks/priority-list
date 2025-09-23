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
			className="p-4 mb-4 bg-orange-100 rounded-lg shadow-md"
		>
			<h2 className="text-2xl font-bold text-orange-800 mb-4">
				Create New Todo
			</h2>
			<div className="flex items-center">
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter a new todo..."
					className="flex-grow p-2 mr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
				/>
				<select
					value={priority}
					onChange={(e) => setPriority(e.target.value)}
					className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
				>
					<option value="high">High</option>
					<option value="medium">Medium</option>
					<option value="low">Low</option>
				</select>
				<button
					type="submit"
					className="ml-4 px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
				>
					Add
				</button>
			</div>
		</form>
	);
};

export default CreateTodo;
