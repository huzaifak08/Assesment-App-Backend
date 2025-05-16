import express from "express";
import dotenv from "dotenv";
import sequelize from "../config/database";
import userRoute from "./routes/user";
import initUser from "./models/user";
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRoute);

initUser(sequelize);

const PORT = process.env.APP_PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
    console.log("Connecting to DB with:", {
      username: process.env.DB_USERNAME,
      password: typeof process.env.DB_PASSWORD,
    });
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
