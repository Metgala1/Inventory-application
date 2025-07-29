const pool = require("./pool");

async function updateTable() {
  console.log("Running update script...");
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query(
      "ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT"
    );
    await client.query("COMMIT");
    console.log("Column image_url added successfully.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error updating table:", err);
  } finally {
    client.release();
    pool.end(); // Close pool so script exits
  }
}

updateTable();

