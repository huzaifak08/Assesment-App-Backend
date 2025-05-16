import UserRoute from "./user_route";
import { Router } from "express";

const router = Router();

router.use("/user", UserRoute);

export default router;
