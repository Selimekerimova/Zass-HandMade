const Products=require("../models/productsModel")

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.send(products).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//get product by id

const getAllProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findById(id);
    res.send(product).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
// delete
const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Products.findByIdAndDelete(id);
    const products = await Products.find({});
    res.status(200).json({
      message: "success",
      deletedProduct: deletedProduct,
      allProducts: products,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//post new product

const addNewProduct = async (req, res) => {
  const newProduct = new Products({ ...req.body });
  try {
    await newProduct.save();
    res.status(201).send({
      message: "created succesfully!",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// update data, put

const updateProductById = async (req, res) => {
  const { id } = req.params;
  try {
    await Products.findByIdAndUpdate(id, { ...req.body });
    const updatedProduct = await Products.findById(id);
    res.status(200).send({
      message: "updated succesfully!",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
    getAllProducts,
    getAllProductsById,
    deleteProductById,
    addNewProduct,
    updateProductById,
  };
  