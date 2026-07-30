import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectdb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import geminiResponse from "./gemini.js";


const app = express();
app.use(cors({
    origin:["http://localhost:5173","https://vexa.vercel.app"],
    credentials:true
}))

const port = process.env.PORT || 5000;
app.use(express.json())
app.use(cookieParser())

// app.get("/", (req,res)=>{
//     res.send("server running")
// })

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

// app.get("/", async (req, res) => {
//   try {
//     const prompt = req.query.prompt;

//     const data = await geminiResponse(prompt);

//     res.json({
//       reply: data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    connectdb();
})



