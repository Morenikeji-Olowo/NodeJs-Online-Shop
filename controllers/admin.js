import Product from "../model/product.js";

const getAddProduct = (req, res, next) => {
res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit === "true"; 
  const prodId = req.params.productId;

  if (!editMode) {
    return res.redirect("/"); 
  }

  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product
    });
  });
};

const postAddProduct = (req, res, next) => {
  const product = new Product(
    null,
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  );

  product.save();
  res.redirect("/");
};

const postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedProduct = new Product(
    productId,
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  );

  updatedProduct.save();
  res.redirect("/admin/products");
}
const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      products: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      hasProducts: products.length > 0,
    });
  });
};

const deleteProduct = (req, res, next)=>{
  const productId = req.body.productId;
  Product.deleteById(productId);
  res.redirect("/admin/products");

}
const adminController = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProduct
};

export default adminController;
