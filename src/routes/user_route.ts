import { Router } from "express";
import { getUserProfileData } from "../controllers/user_controller";
import validateUser from "../middlewares/validate_user";

const router = Router();

router.get("/get-user-data", [validateUser], getUserProfileData);

export default router;
