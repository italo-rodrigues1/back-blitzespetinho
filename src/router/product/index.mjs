import { Router } from "express";
import {
  find,
  create,
  update,
  remove,
} from "../../controllers/product/index.mjs";
import verifyJwt from "../../middleware/verificationJWT.mjs";

const router = Router();

router.get("", find);
router.post("/create", verifyJwt, create);
router.put("/update/:id", verifyJwt, update);
router.delete("/delete/:id", verifyJwt, remove);

export default router;
