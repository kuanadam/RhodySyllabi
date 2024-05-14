import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config();


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE

}).promise()

async function getData() {
const result = await pool.query("SELECT * FROM rhodydatabase")
return result[0]
}

const data = await getData()
console.log(data)