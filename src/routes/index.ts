import AuthRoute from "./auth_route";
import UserRoute from "./user_route";
import { Router } from "express";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/user", UserRoute);

export default router;
