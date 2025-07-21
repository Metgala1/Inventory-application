// db/seed.js
require('dotenv').config();
const pool = require('./pool');

async function seedDatabase() {
  const client = await pool.connect();  // get a client from the pool
  console.log('Connected to the database for seeding...');
  try {
    console.log('Clearing old data...');
    await client.query('DELETE FROM products;');
    await client.query('DELETE FROM categories;');

    console.log('Seeding categories...');
    const categoryResult = await client.query(`
      INSERT INTO categories (name)
      VALUES ('iPhone'), ('iPad'), ('MacBook'), ('Accessories')
      RETURNING id;
    `);
    const [iphoneId, ipadId, macbookId, accessoriesId] = categoryResult.rows.map(row => row.id);

    console.log('Seeding products (2015–2025, including Pro/Max models)...');
    const products = [];

    // iPhones (standard, Pro, Pro Max)
    const iphoneSeries = [
      ['iPhone 6S', 'iPhone 6S Plus'],
      ['iPhone 7', 'iPhone 7 Plus'],
      ['iPhone 8', 'iPhone 8 Plus', 'iPhone X'],
      ['iPhone XS', 'iPhone XS Max', 'iPhone XR'],
      ['iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max'],
      ['iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Pro Max'],
      ['iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max'],
      ['iPhone 14', 'iPhone 14 Pro', 'iPhone 14 Pro Max'],
      ['iPhone 15', 'iPhone 15 Pro', 'iPhone 15 Pro Max'],
      ['iPhone 16', 'iPhone 16 Pro', 'iPhone 16 Pro Max'],
      ['iPhone 17', 'iPhone 17 Pro', 'iPhone 17 Pro Max']
    ];
    iphoneSeries.forEach((models, yearOffset) => {
      const year = 2015 + yearOffset;
      models.forEach((model, index) => {
        const priceBase = 600 + (yearOffset * 50) + (index * 150);
        products.push({
          name: model,
          model: `IP-${year}-${index + 1}`,
          price: priceBase.toFixed(2),
          quantity: Math.floor(Math.random() * 30) + 5,
          description: `${model} released in ${year}`,
          category_id: iphoneId,
        });
      });
    });

    // iPads (Air, Pro, Mini)
    const ipadSeries = [
      ['iPad Air 2', 'iPad Mini 4'],
      ['iPad Pro (9.7")', 'iPad Pro (12.9")'],
      ['iPad Pro 2 (10.5")', 'iPad Pro 2 (12.9")'],
      ['iPad Pro 3 (11")', 'iPad Pro 3 (12.9")'],
      ['iPad Pro 4 (11")', 'iPad Pro 4 (12.9")'],
      ['iPad Pro 5 (11")', 'iPad Pro 5 (12.9")']
    ];
    ipadSeries.forEach((models, yearOffset) => {
      const year = 2015 + yearOffset;
      models.forEach((model, index) => {
        const priceBase = 500 + (yearOffset * 40) + (index * 100);
        products.push({
          name: model,
          model: `IPAD-${year}-${index + 1}`,
          price: priceBase.toFixed(2),
          quantity: Math.floor(Math.random() * 20) + 5,
          description: `${model} released in ${year}`,
          category_id: ipadId,
        });
      });
    });

    // MacBooks (Air, Pro, M-series)
    const macSeries = [
      ['MacBook Pro 2015', 'MacBook Air 2015'],
      ['MacBook Pro 2017', 'MacBook Air 2018'],
      ['MacBook Pro 2020 (M1)', 'MacBook Air 2020 (M1)'],
      ['MacBook Pro 2022 (M2)', 'MacBook Air 2022 (M2)'],
      ['MacBook Pro 2023 (M3)', 'MacBook Air 2023 (M3)'],
      ['MacBook Pro 2025 (M4?)', 'MacBook Air 2025 (M4?)']
    ];
    macSeries.forEach((models, yearOffset) => {
      const year = 2015 + (yearOffset * 2);
      models.forEach((model, index) => {
        const priceBase = 1200 + (yearOffset * 200) + (index * 100);
        products.push({
          name: model,
          model: `MB-${year}-${index + 1}`,
          price: priceBase.toFixed(2),
          quantity: Math.floor(Math.random() * 15) + 2,
          description: `${model} released in ${year}`,
          category_id: macbookId,
        });
      });
    });

    // Accessories (AirPods, Watches, HomePods)
    const accessoriesSeries = [
      ['AirPods (1st Gen)', 'Apple Watch Series 1'],
      ['AirPods (2nd Gen)', 'Apple Watch Series 3'],
      ['AirPods Pro', 'Apple Watch Series 5'],
      ['AirPods Max', 'Apple Watch Series 6'],
      ['AirPods Pro 2', 'Apple Watch Ultra'],
      ['HomePod', 'HomePod Mini']
    ];
    accessoriesSeries.forEach((models, yearOffset) => {
      const year = 2015 + yearOffset;
      models.forEach((model, index) => {
        const priceBase = 150 + (yearOffset * 50) + (index * 50);
        products.push({
          name: model,
          model: `ACC-${year}-${index + 1}`,
          price: priceBase.toFixed(2),
          quantity: Math.floor(Math.random() * 50) + 5,
          description: `${model} released in ${year}`,
          category_id: accessoriesId,
        });
      });
    });

    // Insert all products
    for (const product of products) {
      await client.query(
        `INSERT INTO products (name, model, price, quantity, description, category_id)
         VALUES ($1, $2, $3, $4, $5, $6);`,
        [product.name, product.model, product.price, product.quantity, product.description, product.category_id]
      );
    }

    console.log(`Seeded ${products.length} products successfully!`);
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    client.release();  // ✅ Return the client to the pool
  }
}

seedDatabase();

