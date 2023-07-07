import {
  findProductsServices,
  createProductsServices,
  updateProductsServices,
  removeProductsServices,
} from "../../services/productServices.mjs";

async function find(req, res) {
  if (JSON.stringify(req.body) !== "{}") {
    return res.status(400);
  }

  try {
    const products = await findProductsServices();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

async function create(req, res) {
  const { name, description, price, category, image } = req.body;

  if (!name || !price || !category || !image) {
    return res.status(400).send({
      message: "Name, price, category and image are required",
    });
  }

  try {
    await createProductsServices({
      name,
      description,
      category,
      price,
      image,
    });

    return res.status(200).json({ message: "Produto criado com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

async function update(req, res) {
  if (JSON.stringify(req.body) === "{}") {
    return res.status(400).send({ message: "body invalid" });
  }

  const verificationBody = Object.keys(req.body).filter((key) => {
    if (!["name", "description", "price", "image"].includes(key)) {
      return key;
    }
  });

  if (verificationBody.length > 0) {
    return res.status(500).send({ message: "body invalid" });
  }

  try {
    const updateProduct = await updateProductsServices({
      id: req.params.id,
      body: req.body,
    });
    return res.status(200).json({ message: updateProduct });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

async function remove(req, res) {
  const { id } = req.params;
  try {
    const removeProduct = await removeProductsServices({ id });
    return res.status(200).json({ message: removeProduct });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export { find, create, update, remove };
