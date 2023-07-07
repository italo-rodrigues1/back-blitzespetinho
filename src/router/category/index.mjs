import { Router } from "express";
import { find, create, remove } from "../../controllers/category/index.mjs";
import verifyJwt from "../../middleware/verificationJWT.mjs";

const router = Router();

router.get("", find);
router.post("/create", verifyJwt, create);
router.delete("/delete/:id", verifyJwt, remove);

export default router;
