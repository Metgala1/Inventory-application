const {Router} = require('express');
const indexRouter = Router();
const CategoryController = require('../controllers/categoryController');


indexRouter.get("/categories",  CategoryController.listCategories)
indexRouter.get("/", (req, res) => {
    res.render("index")
})
/*

indexRouter.get("/categories/:id")
indexRouter.get("/products")
indexRouter.get("/products/:id");
indexRouter.get("/products/new")
indexRouter.get("/products/:id/edit");
indexRouter.get("/products/:id/delete");
*/


module.exports = indexRouter;
