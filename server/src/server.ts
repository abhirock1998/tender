import express from "express";
import { configDotenv } from "dotenv";
import { connectToDB } from "@services/db";
import router from "@routes/index";
import { errorMiddleware } from "@middlewares/error.middleware";
import cors from "cors";
configDotenv();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// Registering Index router
app.use("/api/v1/", router);
// errorHandler middleware
app.use(errorMiddleware);

app.listen(3000, async () => {
  await connectToDB();
  console.log("Server is running on port 3000");
});
