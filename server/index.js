import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import { connect } from "mongoose";
import { userRouter } from "./routes/user.js";
import { todoRouter } from "./routes/todo.js";
const app = express();
app.use(cors());
app.use(json());
const port = process.env.PORT || 5000;

app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

app.get("/", (req, res) => {
	console.log("Request on / endpoint!");
	res.json({ msg: "Hello from the backend!" });
});

async function main() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        console.error("MONGODB_URI is not set. Please configure your environment.");
        process.exit(1);
    }
    try {
        await connect(mongoUri);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err?.message || err);
        process.exit(1);
    }
}
main();
