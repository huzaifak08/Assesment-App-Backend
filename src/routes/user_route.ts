import { Router } from "express";
import { registerUser } from "../controllers/auth_controllers";

const router = Router();

router.post("/register-user", registerUser);

export default router;
