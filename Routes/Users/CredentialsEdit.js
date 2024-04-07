import { Router } from "express";
import { AuthCheck } from "../../Middlewares/AuthCheck.js";
import { pool } from "../../Database/Database.js";

export const EditCredentials = Router();

EditCredentials.post('/', AuthCheck, async (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const picture = req.body.picture;

    const id = req.ELB.id;
    
    let count = 1;

    let clause = '';
    if(name){
        clause = clause+'NAME = $1';
        count++;
    }
    if(email){
        clause = clause+', EMAIL = $2';
        count++;
    }
    if(picture){
        clause = clause+', PICTURE = $3';
        count++;
    }

    let arr = [];
    if(name){
        arr.push(name);
    }
    if(email){
        arr.push(email);
    }
    if(picture){
        arr.push(picture);
    }
    arr.push(id);

    let client;
    try {
        client = await pool.connect();
        client.query(`UPDATE users SET ${clause} WHERE ID = $${count}`,arr,(err,result) => {
            if(err){
                res.status(500).json({
                    'Error' : 'Query not working'
                })
            }else{
                res.json({
                    msg : 'Credentials updated successfully'
                })
            }
        });
    } catch (error) {
        res.status(500).json({
            'Error' : "Could not connect to database",
        })
    } finally {
        client.release();
    }

})