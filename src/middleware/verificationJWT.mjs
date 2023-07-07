import jwt from "jsonwebtoken";

const verifyJwt = (req, res, next) => {
  console.log("verifyJwt", req.headers);
  let token = req.headers?.authorization?.split(" ")[1];
  console.log("token", token);

  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, process.env.KEY_JWT_SECRET, (err, decoded) => {
    console.log("err", err, decoded);

    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.user = decoded;
  });
  next();
};

export default verifyJwt;
