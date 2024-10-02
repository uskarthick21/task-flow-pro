import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';

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

app.get("/", async (req: Request, res: Response) => {
     res.status(200).json({
        status: "healthy",
    })
})

app.listen(4004, async() => {
    console.log(`server is running on port ${PORT} in ${NODE_ENV} enviroment`);
    await connectDB();
})