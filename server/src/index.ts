import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import errorHandler from './middleware/errorHandlers';
import { OK } from './constants/http';
import authRoutes from './routes/auth.routes';
import path from "path";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(
    cors({
      origin: APP_ORIGIN,
      credentials: true,
    })
  );
  app.use(cookieParser());

// app.get("/", async (req, res)) if we call async, then entire function would return promise rejection. 
// we have to wrap everything try and catch block.

app.use(express.static(path.join(__dirname, "../../client/build")));

app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});

app.use(errorHandler);

app.listen(PORT, async() => {
    console.log(`server is running on port ${PORT} in ${NODE_ENV} enviroment`);
    await connectDB();
})