const {Router} = require('express');
const indexRouter = Router();
const CategoryController = require('../controllers/categoryController');
const productController = require("../controllers/productController");



indexRouter.get("/categories",  CategoryController.listCategories)
indexRouter.get("/", (req, res) => {
    res.render("index")
})
indexRouter.get("/categories/:id", CategoryController.categoryDetail);
indexRouter.get("/products", productController.listProducts)
indexRouter.get("/products/new", productController.showCreateProductForm);
indexRouter.get("/products/:id", productController.getProductDetails);
indexRouter.post("/products", productController.createProduct);
indexRouter.get("/products/:id/edit", productController.showEditProductForm);
indexRouter.get("/products/:id/delete", productController.showDeleteProduct);




module.exports = indexRouter;
