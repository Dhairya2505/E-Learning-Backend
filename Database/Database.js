import pg from "pg";

const { Pool } = pg;

import dotenv from 'dotenv';

dotenv.config();
// dotenv.config({
//     path : './../.env'
// });

const connection = process.env.DATABASE_URL;

export const pool = new Pool({
    connectionString : connection,
})

async function setQuery(){
    let client;
    try {
        client = await pool.connect();
        console.log('Connection Successful');
        try {
            await client.query(`DELETE FROM verificationtable;`);
            console.log('Query Successful');
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log('Connection Unsuccessful');
    }finally{
        client.release();
    }
}
// setQuery();

// CREATE TABLE Users (
//     ID VARCHAR(50) PRIMARY KEY,
//     NAME VARCHAR(100) NOT NULL,
//     EMAIL VARCHAR(100) UNIQUE NOT NULL,
//     PASSWORD VARCHAR(255) NOT NULL,
//     PICTURE VARCHAR(255), 
//     _TYPE BOOLEAN DEFAULT FALSE
// );

// CREATE TABLE Courses (
//     ID VARCHAR(50) PRIMARY KEY, 
//     NAME VARCHAR(255) NOT NULL, 
//     DESCRIPTION VARCHAR(255), 
//     PRICE INT NOT NULL, 
//     LEVEL VARCHAR(10), 
//     CATEGORY VARCHAR(50), 
//     POPULARITY BIGINT, 
//     LANGUAGE VARCHAR(30), 
//     RATING DECIMAL(2,1), 
//     CREATED_BY VARCHAR(100)
// );

// CREATE TABLE Purchased_Courses (
//     User_id VARCHAR(50) NOT NULL, 
//     Course_id VARCHAR(50) NOT NULL, 
//     Course_Name VARCHAR(255) NOT NULL, 
//     Course_Description VARCHAR(255), 
//     Language VARCHAR(30), 
//     Purchased_Date_Time TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'Asia/Kolkata')
// );

// CREATE TABLE verificationtable (
//     NAME VARCHAR(100) NOT NULL, 
//     EMAIL VARCHAR(100) NOT NULL, 
//     PASSWORD VARCHAR(255) NOT NULL, 
//     TIME_STAMP BIGINT, 
//     VERIFY BOOLEAN DEFAULT FALSE
// );