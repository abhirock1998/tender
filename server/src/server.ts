import express from "express";
import { connectToDB } from "@services/db";
import { errorMiddleware } from "@middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use(errorMiddleware);

app.listen(3000, async () => {
  await connectToDB();
  console.log("Server is running on port 3000");
});
