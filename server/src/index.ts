import express, {Request, Response} from "express"
import cors from 'cors';
import "dotenv/config";
import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env';
import connectDB from './config/db';
import errorHandler from './middleware/errorHandlers';
import { OK } from './constants/http';
import authRoutes from './routes/auth.routes';
import path from "path";
import cookieParser from 'cookie-parser';
import authenticate from "./middleware/authenticate";
import userRoutes from "./routes/user.routes";

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

  // Auth Routes
  app.use("/auth", authRoutes);

  // User Routes
  app.use("/user", authenticate, userRoutes);

/**
 * ----------------- Deployment ---------------- 
 */

if(process.env.NODE_ENV === "development") {
  app.get("/", (req, res) => {
    res.status(OK).json({
        status: "healthy",
    })
})
} else {
  app.use(express.static(path.join(__dirname, "../../client/build")));

  app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
  });
}

/**
 * ----------------- Deployment ---------------- 
 */

app.use(errorHandler);

app.listen(PORT, async() => {
    console.log(`server is running on port ${PORT} in ${NODE_ENV} enviroment`);
    await connectDB();
})