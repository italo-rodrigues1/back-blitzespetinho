import {
  findCategoryServices,
  removeCategoryServices,
  createCategoryServices,
} from "../../services/categoryServices.mjs";

async function find(req, res) {
  if (JSON.stringify(req.body) !== "{}") {
    return res.status(400);
  }

  try {
    const category = await findCategoryServices();
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

async function create(req, res) {
  const { name, image } = req.body;

  if (!name || !image) {
    return res.status(400).send({
      message: "Name and image are required",
    });
  }

  try {
    await createCategoryServices({
      name,
      image,
    });

    return res.status(200).json({ message: "Categoria criado com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

async function remove(req, res) {
  const { id } = req.params;
  try {
    const removeCategory = await removeCategoryServices({ id });
    return res.status(200).json({ message: removeCategory });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export { find, create, remove };
