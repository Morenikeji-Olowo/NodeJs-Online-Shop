import Product from "../model/product.js";

const getAddProduct = (req, res) => {
  res.render("add-product", {
    doc_title: "Add Product",
    path: "/admin/add-product",
  });
};

const postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

const getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      products: products,
      doc_title: "Shop",
      path: "/",
      hasProducts: products.length > 0,
    });
  });

};

const productsController = {
  getAddProduct,
  postAddProduct,
  getProducts,
};

export default productsController;
