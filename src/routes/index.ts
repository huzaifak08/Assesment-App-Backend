import AuthRoute from "./auth_route";
import UserRoute from "./user_route";
import QuoteRoute from "./quotes_route";
import { Router } from "express";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/user", UserRoute);
router.use("/quote", QuoteRoute);

export default router;
