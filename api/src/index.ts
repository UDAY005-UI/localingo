import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cron from 'node-cron';
import { resetCount } from './utils/mapUsage.js';
import mapRoutes from './routes/mapRoutes.js'

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

app.use("/api", mapRoutes);

cron.schedule("0 0 1 * *", () => {
    resetCount();
    console.log("Monthly map request count reset!");
  });

app.get("/", (_req, res) => {
    res.send("Hello ! Backend is running !")
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});