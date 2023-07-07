import Product from "../models/products.mjs";
import Category from "../models/category.mjs";

async function findProductsServices() {
  return await Product.find();
}

async function createProductsServices({
  name,
  description,
  price,
  category,
  image,
}) {
  const findCategory = await Category.findOne({
    name: category.toLowerCase(),
  });

  if (!findCategory) {
    throw new Error("Categoria não existe, reveja o campo.");
  }

  const findProduct = await Product.findOne({
    name,
    idCategory: findCategory?._id,
    price,
  });

  if (!findProduct) {
    return Product.create({
      name,
      description,
      price,
      idCategory: findCategory._id,
      image,
    });
  }

  throw new Error("Produto já cadastrado!");
}

async function updateProductsServices({ body, id }) {
  return await Product.updateOne({ _id: id }, body);
}

async function removeProductsServices({ id }) {
  const deleteProduct = await Product.deleteOne({ _id: id });
  if (deleteProduct.deletedCount > 0) {
    return "Produto deletado com sucesso";
  }
  return "Produto não encontrado";
}

export {
  findProductsServices,
  createProductsServices,
  updateProductsServices,
  removeProductsServices,
};
