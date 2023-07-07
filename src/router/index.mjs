import { Router } from "express";
import user from "./user/index.mjs";
import product from "./product/index.mjs";
import category from "./category/index.mjs";

const router = Router();

router.use("/user", user);
router.use("/product", product);
router.use("/category", category);

export default router;
