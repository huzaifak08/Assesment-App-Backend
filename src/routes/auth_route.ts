import { Router } from "express";
import { registerUser, signInUser } from "../controllers/auth_controller";

const router = Router();

router.post("/register-user", registerUser);
router.post("/sign-in-user", signInUser);

export default router;
