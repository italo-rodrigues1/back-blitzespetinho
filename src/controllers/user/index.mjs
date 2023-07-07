import {
  findUserServices,
  createUserServices,
} from "../../services/userServices.mjs";

async function find(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "email and password are required" });
  }

  try {
    const user = await findUserServices({
      email,
      password,
    });
    return res.status(200).json({ token: user, auth: true });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

async function create(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "email and password are required" });
  }

  try {
    const createUser = await createUserServices({
      email,
      password,
    });
    return res
      .status(200)
      .json(createUser.email ? createUser : { message: createUser });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export { find, create };
