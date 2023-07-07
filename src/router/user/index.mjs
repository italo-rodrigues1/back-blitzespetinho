import { Router } from "express";
import { find, create } from "../../controllers/user/index.mjs";

const router = Router();

router.post("", find);
router.post("/create", create);

export default router;
