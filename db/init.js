const pool = require('./pool');

const query1 = `CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);`;

const query2 = `CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    model VARCHAR(50),
    price NUMERIC(10,2) NOT NULL,
    quantity INT DEFAULT 0,
    description TEXT,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL
);`;

async function createTables() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN'); // Start transaction

        console.log('Creating Categories table...');
        await client.query(query1);

        console.log('Creating Products table...');
        await client.query(query2);

        await client.query('COMMIT'); // Save changes
        console.log('Tables created successfully!');
    } catch (error) {
        await client.query('ROLLBACK'); // Undo changes on error
        console.error('Error creating tables:', error);
    } finally {
        client.release();
    }
}

createTables();

