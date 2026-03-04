import Product from "../model/product.js";

const getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

const postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title, req.body.imageUrl, req.body.description, req.body.price);
  product.save();
  res.redirect("/");
};

const getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
    res.render("admin/products", {
      products: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      hasProducts: products.length > 0,
    });
  });
}

const adminController = {
    getAddProduct,
    postAddProduct,
    getProducts
}

export default adminController;
