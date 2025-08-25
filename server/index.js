import "dotenv/config";
import express, { json } from "express";
import { connect } from "mongoose";
import { userRouter } from "./routes/user.js";
import { todoRouter } from "./routes/todo.js";
const app = express();
app.use(json());
const port = process.env.PORT || 5000;

app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

app.get("/", (req, res) => {
	console.log("Request on / endpoint!");
	res.json({ msg: "Hello from the backend!" });
});

async function main() {
	await connect(process.env.MONGODB_URI);
	app.listen(port, () => {
		console.log(`Server listening on port ${port}`);
	});
}
main();
