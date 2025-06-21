import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js"
import cors from "cors"
import path from "path"

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve()

if(process.env.NODE_ENV !== "production") {
    //middleware will parse JSON bodies and get parameters
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    );
}

app.use(express.json());
app.use(rateLimiter);


//test middleware
app.use((req, res, next) => {
    console.log(`Req Method: ${req.method} and Req URL: ${req.url}`);
    next();
})

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production" || true) {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*" , (req, res) => {
        res.sendFile(path.join(__dirname,"../frontend", "dist","index.html"))
    })
}

connectDB().then(() => {
    app.listen(port, () => {
        console.log("Server started on port:", port);
    });
});
