const pool = require("./pool")

async function logResult () {
    const client = await pool.connect()
    try{
    const myResult = await client.query("SELECT * FROM products ORDER BY name")
    }catch(err){
        console.log(err)
    }
}

logResult()