const pool = require("../db/pool");

exports.listCategories = async (req, res) => {
    try{
        const {rows} = await pool.query("SELECT * FROM categories ORDER BY name");
        res.render("categories/list", {title: "Categories", categories: rows});
    }catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).send("Internal Server Error");
    }
}

exports.categoryDetail = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the category itself
    const categoryResult = await pool.query(
      'SELECT * FROM categories WHERE id = $1',
      [id]
    );

    if (categoryResult.rows.length === 0) {
      return res.status(404).send('Category not found');
    }

    const category = categoryResult.rows[0];

    // Fetch products in this category
    const productsResult = await pool.query(
      'SELECT * FROM products WHERE category_id = $1 ORDER BY name',
      [id]
    );

    res.render('categories/detail', {
      title: `${category.name} Products`,
      category,
      products: productsResult.rows,
    });
  } catch (err) {
    console.error('Error fetching category detail:', err);
    res.status(500).send('Server Error');
  }
};