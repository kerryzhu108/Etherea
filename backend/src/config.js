require("dotenv").config();

const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction ? {
        rejectUnauthorized: false
    } : false
});

// const config = {
//     db: {
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASS,
//         database: process.env.DB_NAME,
//         ssl: {
//             rejectUnauthorized: false
//         }
//     }
// };

// module.exports = config;

async function dropTables() {
    if (isProduction) {
        return;
    }
    client = await pool.connect();
    await client.query(`DROP TABLE IF EXISTS users CASCADE`, 
        (err, result) => {
            if (err) {
                console.log("Error dropping table users.")
                console.log(err);
            } else {
                console.log("Table users dropped.")
            }
        });

    await client.query(`DROP TABLE IF EXISTS progressInfo CASCADE`, 
        (err, result) => {
            if (err) {
                console.log("Error dropping table progressInfo.")
                console.log(err);
            } else {
                console.log("Table progressInfo dropped.")
            }
        });
    
    await client.query(`DROP TABLE IF EXISTS impactStats CASCADE`, 
        (err, result) => {
            if (err) {
                console.log("Error dropping table impactStats.")
                console.log(err);
            } else {
                console.log("Table impactStats dropped.")
            }
        });    
    client.release();
    return;
}


async function createTables() {
    client = await pool.connect();
    await client.query(`CREATE TABLE IF NOT EXISTS users (
                uid BIGSERIAL PRIMARY KEY NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(100),
                firstname VARCHAR(50) NOT NULL,
                lastname VARCHAR(50) NOT NULL,
                refresh VARCHAR(255),
                UNIQUE(email)
                )`,
        (err, result) => {
            if (err) {
                console.log("Error creating table users.")
                console.log(err);
            } else {
                console.log("Table users created.")
            }
        });

    await client.query(`CREATE TABLE IF NOT EXISTS progressInfo (
                id BIGSERIAL PRIMARY KEY NOT NULL,
                exp INTEGER DEFAULT 0 NOT NULL,
                streak INTEGER DEFAULT 0 NOT NULL
                )
                `,
        (err, result) => {
            if (err) {
                console.log("Error creating table progressInfo.")
                console.log(err);
            } else {
                console.log("Table progressInfo created.")
            }
        });

    await client.query(`CREATE TABLE IF NOT EXISTS impactStats (
                uid BIGSERIAL PRIMARY KEY NOT NULL,
                emissionsReduced REAL DEFAULT 0 NOT NULL,
                animalsSaved REAL DEFAULT 0 NOT NULL,
                CONSTRAINT foreignKey_uid
                    FOREIGN KEY(uid) 
                    REFERENCES users(uid)
                    ON DELETE CASCADE)`,
        (err, result) => {
            if (err) {
                console.log("Error creating table impactStats.")
                console.log(err);
            } else {
                console.log("Table impactStats created.")
            }
        });
    client.release();
    return;
}

module.exports = { pool, createTables, dropTables };
