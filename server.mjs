import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import router from "./src/router/index.mjs";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT;
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5000",
  "https://blitzespetinho.netlify.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Acesso não permitido pelo CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE, PATCH",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.MONGODB_URL, options)
  .then(() => {
    console.log("BlitzEspetinhos > MongoDb Connect >  successfully");
    app.use(cors(corsOptions));

    app.use(bodyParser.json({ limit: "100mb" }));
    app.use(bodyParser.urlencoded({ limit: "100mb", extended: false }));

    // app.use(
    //   helmet.contentSecurityPolicy({
    //     directives: {
    //       scriptSrc: ["'self'"],
    //       styleSrc: ["'self'"],
    //     },
    //   })
    // );
    // app.use(helmet.xssFilter());
    // app.use(helmet.noSniff());
    // app.use(
    //   helmet.referrerPolicy({
    //     policy: "no-referrer",
    //   })
    // );
    // app.use(
    //   helmet.frameguard({
    //     action: "deny",
    //   })
    // );
    // app.use(
    //   helmet.frameguard({
    //     action: "sameorigin",
    //   })
    // );

    app.use(helmet());

    app.use((_req, res, next) => {
      res.setHeader("X-XSS-Protection", "1; mode=block");
      next();
    });

    app.use("/api", router);

    app.listen(port || 3333, () => console.log("listening on port " + port));
  })
  .catch((err) => {
    console.log("BlitzEspetinhos > MongoDb Connect > failed", err);
  });
