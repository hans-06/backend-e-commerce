import express from "express";
import colors from "colors"
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js"
import cors from "cors"
import Razorpay from "razorpay";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";


//configure env
dotenv.config()

//database config
connectDB();

//ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middlewares
app.use(cookieParser());
app.use(bodyParser.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.NODE_APP_API,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './client/build')));

//routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);

//rest api
app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

//razorpay instance
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});


//Port
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`.bgCyan.white);
})