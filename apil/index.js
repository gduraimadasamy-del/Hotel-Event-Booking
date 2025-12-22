import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRouter from "./routers/auth.js"
import usersRouter from "./routers/users.js"
import eventRouter from "./routers/events.js"
import hotelsRouter from "./routers/hotels.js"
import cookieParser from "cookie-parser";
import cors from "cors";

export const app=express()
 dotenv.config()
 
 mongoose.connect("mongodb://127.0.0.1:27017/project")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.get("/users",(req,res)=>{
  res.send("hello")
})
//midele where
app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use("/apil/auth",authRouter);
app.use("/apil/users",usersRouter);
app.use("/apil/events",eventRouter);
app.use("/apil/hotels",hotelsRouter);
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Backend is running');
});
app.listen(PORT, () => 
  console.log("connected backend!"));





