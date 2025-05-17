import { Router } from "express";
import { getRandomQuote } from "../controllers/quotes_controller";
import validateUser from "../middlewares/validate_user";

const router = Router();

router.get("/get-random-quote", [validateUser], getRandomQuote);

export default router;
