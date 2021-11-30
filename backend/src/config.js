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

        
    await client.query(`DROP TABLE IF EXISTS themes CASCADE`, 
    (err, result) => {
        if (err) {
            console.log("Error dropping table themes.")
            console.log(err);
        } else {
            console.log("Table themes dropped.")
        }
    });  
     
    await client.query(`DROP TABLE IF EXISTS taskList CASCADE`, 
    (err, result) => {
        if (err) {
            console.log("Error dropping table taskList.")
            console.log(err);
        } else {
            console.log("Table taskList dropped.")
        }
    });  

    await client.query(`DROP TABLE IF EXISTS taskCompletion CASCADE`, 
    (err, result) => {
        if (err) {
            console.log("Error dropping table taskCompletion.")
            console.log(err);
        } else {
            console.log("Table taskCompletion dropped.")
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
    

    await client.query(`CREATE TABLE IF NOT EXISTS themes(
                id int PRIMARY KEY,
                theme varchar(100),
                multiplier int,
                statName varchar(100),
                dateLaunched DATE,
                colour varchar(100)
                );
                INSERT INTO themes VALUES (1, 'Climate Change', 2, 'CO2', to_date('2021-10-01','yyyy-mm-dd'), '#A0E3B2');
                INSERT INTO themes VALUES (2, 'Mental Health', 5, 'Mental Health', to_date('2021-11-01','yyyy-mm-dd'), '#A0E3B2');
                INSERT INTO themes VALUES (3, 'Animal Cruelty', 3, 'Animals', to_date('2021-12-01','yyyy-mm-dd'), '#F296B8');
                INSERT INTO themes VALUES (4, 'Social Justice', 4, 'Social', to_date('2022-01-01','yyyy-mm-dd'), '#F296B8');
                `,
        (err, result) => {
            if (err) {
                console.log("Error creating table themes.")
                console.log(err);
            } else {
                console.log("Table themes created.")
            }
        });
    
    await client.query(`CREATE TABLE IF NOT EXISTS taskList(
                id int PRIMARY KEY,
                themeID int,
                descript varchar(200),
                taskName varchar(100),
                points int,
                CONSTRAINT fk_themes -- foreign key from themes
                    FOREIGN KEY (themeID)
                        REFERENCES themes(id)
            );
            INSERT INTO taskList VALUES(1, 1, 'Eat vegetarian', 'Vegetarian Challenge', 10);
            INSERT INTO taskList VALUES(2, 1, 'Make your commute green', 'A New Way to Travel', 20);
            INSERT INTO taskList VALUES(3, 1, 'Reduce use of plastic packaging', 'Reduce, Reuse, Recycle', 30);
            INSERT INTO taskList VALUES(4, 1, 'Support youth-led Movements', 'Supporting the Youth', 10);

            INSERT INTO taskList VALUES(5, 2, 'Shadow work', 'Shadow', 5);
            INSERT INTO taskList VALUES(6, 2, 'Gratitude list', 'Be Happy', 5);
            INSERT INTO taskList VALUES(7, 2, 'Meditation', 'Calm', 10);
            INSERT INTO taskList VALUES(8, 2, 'Yoga', 'Calm Again', 10);
            INSERT INTO taskList VALUES(9, 2, 'Breathing exercises', 'In.... Out' ,10);
            INSERT INTO taskList VALUES(10, 2, 'Social Media Detox', 'No Social Media', 20);

            INSERT INTO taskList VALUES(11, 3, 'Dairy-free Diet', 'Save the Cows', 20);
            INSERT INTO taskList VALUES(12, 3, 'Meat-free Diet', 'Save the Meat', 15);
            INSERT INTO taskList VALUES(13, 3, 'Only use vegan makeup and clothes', 'A New Lifestyle', 20);
            `,
        (err, result) => {
            if (err) {
                console.log("Error creating table taskList.")
                console.log(err);
            } else {
                console.log("Table taskList created.")
            }
        });

  

    await client.query(`CREATE TABLE IF NOT EXISTS  taskCompletion(
                userID int,
                taskID int,
                dateTodo DATE,
                complete boolean DEFAULT false,
                dateCreated DATE,
                PRIMARY KEY (userID, taskID, dateTodo)
            );`,
        (err, result) => {
            if (err) {
                console.log("Error creating table taskCompletion.")
                console.log(err);
            } else {
                console.log("Table taskCompletion created.")
            }
        });

    await client.query(`CREATE VIEW v_theme_task AS
                    SELECT themes.id themeID, theme, taskList.id taskID, descript, points, colour FROM themes 
                    JOIN taskList ON taskList.themeID = themes.id;`,
        (err, result) => {
            if (err) {
                console.log("Error creating view v_theme_task.")
                console.log(err);
            } else {
                console.log("Table v_theme_task created.")
            }
        });

    await client.query(`CREATE or REPLACE VIEW v_userTask AS 
                        SELECT userID, vt.taskID, descript, themeID, theme, complete, dateTodo,points
                        FROM taskCompletion tc
                        JOIN v_theme_task vt ON vt.taskID = tc.taskID;`,
        (err, result) => {
            if (err) {
                console.log("Error creating view v_userTask.")
                console.log(err);
            } else {
                console.log("Table v_userTask created.")
            }
        });

    client.release();
    return;
}

module.exports = { pool, createTables, dropTables };
