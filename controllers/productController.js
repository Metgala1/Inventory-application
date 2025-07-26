const pool = require("../db/pool"); 

exports.listProducts = async (req, res) => {
     try{
        const { rows } = await pool.query("SELECT * FROM products ORDER BY name");
        res.render("products/list", { title: "Products", products: rows });
     }catch (error) {
        console.error("Error fetching products:", error.message, error.stack);
        res.status(500).send(`Server Error: ${error.message}`);
     }
}

exports.getProductDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const productResult = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

    if (productResult.rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    const product = productResult.rows[0];

    res.render("products/details", {
      title: product.name,
      product,
    });
  } catch (error) {
    console.error("Error fetching product details:", error.message, error.stack);
    res.status(500).send("Server Error");
  }
};
