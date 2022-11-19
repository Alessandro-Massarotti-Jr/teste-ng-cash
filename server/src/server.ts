import express from "express";
import { routes } from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

app.use(cors({origin:"http://127.0.0.1:3000",credentials:true}));
app.use(express.json());
app.use(cookieParser());
app.use(routes);


app.listen(process.env.PORT || 3333, () => { console.log(`HTTP Server runing in port: ${process.env.PORT || 3333}`) });