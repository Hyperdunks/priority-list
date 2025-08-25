import { useState } from "react";
import axios from "axios";

export default function SignIn() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/api/user/signin", {
				username,
				password,
			});
			localStorage.setItem("token", response.data.token);
			console.log("Sign-in successful:", response.data);
		} catch (error) {
			console.error(
				"Sign-in error:",
				error.response?.data?.message || error.message,
			);
		}
	};

	const handleSignUp = async () => {
		try {
			const response = await axios.post("/api/user/signup", {
				username,
				email,
				password,
			});
			console.log("Sign-up successful:", response.data);
		} catch (error) {
			console.error(
				"Sign-up error:",
				error.response?.data?.message || error.message,
			);
		}
	};

	return (
		<div className="h-screen flex items-center justify-center bg-gray-50">
			<div className="w-96 bg-white shadow-2xl border border-neutral-200 rounded-2xl p-6">
				<form onSubmit={handleSignIn} className="space-y-4">
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none text-gray-900 placeholder-gray-400 "
					/>

					<input
						type="email"
						placeholder="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none text-gray-900 placeholder-gray-400 "
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none text-gray-900 palceholder-gray-400"
					/>
					<button
						type="submit"
						onClick={handleSignIn}
						className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 transition disabled:bg-amber-300 disabled:cursor-not-allowed"
					>
						Sign In
					</button>
				</form>

				{/* Divider */}
				<div className="flex items-center my-6">
					<div className="flex-grow h-px bg-gray-300"></div>
					<span className="px-2 text-sm text-gray-500">or</span>
					<div className="flex-grow h-px bg-gray-300"></div>
				</div>

				{/* Sign Up Button */}
				<button
					onClick={handleSignUp}
					className="w-full bg-amber-400 text-white py-3 rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50 transition"
				>
					Sign Up
				</button>
			</div>
		</div>
	);
}
