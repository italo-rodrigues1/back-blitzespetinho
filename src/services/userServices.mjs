import User from "../models/user.mjs";
import jwt from "jsonwebtoken";

const authJwt = async (email) => {
  return jwt.sign(
    {
      email: email,
    },
    process.env.KEY_JWT_SECRET,
    { expiresIn: "100000000" }
  );
};

async function findUserServices({ email, password }) {
  const findUser = await User.findOne({ email, password });

  if (!findUser) {
    throw new Error("Usuário inválido");
  }

  return authJwt(findUser.email);
}

async function createUserServices({ email, password }) {
  const findUser = await User.findOne({ email, password });
  if (!findUser) {
    await User.create({ email: email, password: password });

    return authJwt(findUser.email);
  }
  return "Usuário já existe";
}

export { findUserServices, createUserServices };
