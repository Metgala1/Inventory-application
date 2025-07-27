const { Router } = require('express');
const indexRouter = Router();
const CategoryController = require('../controllers/categoryController');
const productController = require("../controllers/productController");
const dashboardController = require("../controllers/dashBoardController");



indexRouter.get("/categories", CategoryController.listCategories);
indexRouter.get("/", dashboardController.showDashboard);
indexRouter.get("/categories/:id", CategoryController.categoryDetail);
indexRouter.get("/products", productController.listProducts);
indexRouter.get("/products/new", productController.showCreateProductForm);

// Specific routes FIRST
indexRouter.get("/products/:id/edit", productController.showEditProductForm);
indexRouter.post("/products/:id/edit", productController.updateProduct);

indexRouter.get("/products/:id/delete", productController.showDeleteProduct);
indexRouter.post("/products/:id/delete", productController.deleteProduct);

// Generic "view details" route LAST
indexRouter.get("/products/:id", productController.getProductDetails);

indexRouter.post("/products", productController.createProduct);

module.exports = indexRouter;

