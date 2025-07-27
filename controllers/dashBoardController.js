const pool = require("../db/pool");

// Dashboard homepage
exports.showDashboard = async (req, res) => {
  try {
    const productCountResult = await pool.query("SELECT COUNT(*) FROM products");
    const categoryCountResult = await pool.query("SELECT COUNT(*) FROM categories");
    const lowStockResult = await pool.query(
      "SELECT id, name, quantity FROM products WHERE quantity < 5 ORDER BY quantity ASC LIMIT 5"
    );

    res.render("dashboard", {
      title: "AppleVault Dashboard",
      productCount: productCountResult.rows[0].count,
      categoryCount: categoryCountResult.rows[0].count,
      lowStockProducts: lowStockResult.rows,
    });
  } catch (error) {
    console.error("Error loading dashboard:", error);
    res.status(500).send("Server Error");
  }
};
