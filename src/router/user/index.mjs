import { Router } from "express";
import { find, create } from "../../controllers/user/index.mjs";
import basicAuth from "express-basic-auth";

const router = Router();

router.post("", find);

router.post(
  "/create",
  basicAuth({
    users: {
      [process.env.AUTH_USER]: [process.env.AUTH_SECRET],
    },
  }),
  create
);

export default router;
