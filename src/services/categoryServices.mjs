import Category from "../models/category.mjs";

async function findCategoryServices() {
  return Category.find();
}

async function createCategoryServices({ name, image }) {
  const findCategory = await Category.findOne({
    name,
  });

  if (!findCategory) {
    return Category.create({
      name: name.toLowerCase(),
      image,
    });
  }

  throw new Error("Categoria já cadastrado!");
}

async function removeCategoryServices({ id }) {
  const deleteCategory = await Category.deleteOne({ _id: id });
  if (deleteCategory.deletedCount > 0) {
    return "Categoria deletado com sucesso";
  }
  return "Categoria não encontrado";
}

export { findCategoryServices, createCategoryServices, removeCategoryServices };
