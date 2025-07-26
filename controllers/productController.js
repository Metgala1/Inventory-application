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

exports.showCreateProductForm = async (req, res) => {
  try {
    const { rows: categories } = await pool.query("SELECT * FROM categories ORDER BY name");
    res.render("products/new", { title: "Add New Product", categories });
  } catch (error) {
    console.error("Error showing product form:", error);
    res.status(500).send("Server Error");
  }
};

// Handle product creation (POST)
exports.createProduct = async (req, res) => {
  const { name, description, price, stock_quantity, category_id } = req.body;

  try {
    await pool.query(
      `INSERT INTO products (name, description, price, stock_quantity, category_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, description, price, stock_quantity, category_id]
    );
    res.redirect("/products");
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Server Error");
  }
};

// Show "Edit Product" form
exports.showEditProductForm = async (req, res) => {
  const { id } = req.params;

  try {
    const productResult = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    const categoryResult = await pool.query("SELECT * FROM categories ORDER BY name");

    if (productResult.rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    res.render("products/edit", {
      title: `Edit ${productResult.rows[0].name}`,
      product: productResult.rows[0],
      categories: categoryResult.rows,
    });
  } catch (error) {
    console.error("Error showing edit form:", error);
    res.status(500).send("Server Error");
  }
};

// Handle product update (POST)
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock_quantity, category_id } = req.body;

  try {
    await pool.query(
      `UPDATE products
       SET name = $1, description = $2, price = $3, stock_quantity = $4, category_id = $5
       WHERE id = $6`,
      [name, description, price, stock_quantity, category_id, id]
    );
    res.redirect(`/products/${id}`);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Server Error");
  }
};

// Show "Delete Product" confirmation
exports.showDeleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productResult = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

    if (productResult.rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    res.render("products/delete", {
      title: `Delete ${productResult.rows[0].name}`,
      product: productResult.rows[0],
    });
  } catch (error) {
    console.error("Error loading delete confirmation:", error);
    res.status(500).send("Server Error");
  }
};

// Handle product deletion (POST)
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { admin_password } = req.body;

  // Optional: protect with an admin password (extra credit)
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "secret123";

  if (admin_password !== ADMIN_PASSWORD) {
    return res.status(403).send("Unauthorized: Wrong password");
  }

  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.redirect("/products");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Server Error");
  }
};
