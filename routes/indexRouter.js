const {Router} = require('express');
const indexRouter = Router();
const CategoryController = require('../controllers/categoryController');
const productContrller = require("../controllers/productController")


indexRouter.get("/categories",  CategoryController.listCategories)
indexRouter.get("/", (req, res) => {
    res.render("index")
})
indexRouter.get("/categories/:id", CategoryController.categoryDetail);
indexRouter.get("/products", productContrller.listProducts)
indexRouter.get("/products/:id", productContrller.getProductDetails);
/*


;
indexRouter.get("/products/new")
indexRouter.get("/products/:id/edit");
indexRouter.get("/products/:id/delete");
*/


module.exports = indexRouter;
