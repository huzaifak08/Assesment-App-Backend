import express from "express";
import dotenv from "dotenv";
import sequelize from "../config/database";
import initUser from "./models/user_model";
import Router from "./routes";
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes:
app.use(Router);

initUser(sequelize);

const PORT = process.env.APP_PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
