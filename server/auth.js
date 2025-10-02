import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "some_secure_password";

function userAuth(req, res, next) {
	const token = req.headers?.token || req.headers?.authorization?.replace("Bearer ", "");
	if (!token) {
		return res.status(401).json({ message: "Missing auth token" });
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.userId = decoded.id;
		return next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid or expired token" });
	}
}

export default { userAuth };
