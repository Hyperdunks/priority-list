import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signin() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSignin = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const response = await axios.post("/api/user/signin", {
				username,
				password,
			});
			localStorage.setItem("token", response.data.token);
			navigate("/todos");
		} catch (error) {
			const msg =
				error?.response?.data?.message || "Signin failed. Please try again.";
			setError(msg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center px-4">
			<div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
				<h1 className="text-2xl font-semibold text-gray-900 mb-1">
					Welcome back
				</h1>
				<p className="text-sm text-gray-500 mb-5">Sign in to continue</p>
				{error && (
					<div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-sm">
						{error}
					</div>
				)}
				<form onSubmit={handleSignin}>
					<div className="mb-4">
						<label
							className="block text-sm font-medium text-gray-700 mb-1"
							htmlFor="username"
						>
							Username
						</label>
						<input
							className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
							id="username"
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="mb-6">
						<label
							className="block text-sm font-medium text-gray-700 mb-1"
							htmlFor="password"
						>
							Password
						</label>
						<input
							className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
							id="password"
							type="password"
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-xl disabled:opacity-60"
						type="submit"
						disabled={loading}
					>
						{loading ? "Signing in..." : "Sign In"}
					</button>
				</form>
				<div className="text-sm text-gray-500 mt-4">
					Don't have an account?{" "}
					<Link to="/signup" className="text-orange-600 hover:underline">
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Signin;
