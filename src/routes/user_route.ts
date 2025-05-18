import { Router } from "express";
import {
  getAllUsersProfileData,
  getUserProfileData,
} from "../controllers/user_controller";
import validateUser from "../middlewares/validate_user";

const router = Router();

router.get("/get-user-data", [validateUser], getUserProfileData);
router.get("/get-all-users-data", [validateUser], getAllUsersProfileData);

export default router;
