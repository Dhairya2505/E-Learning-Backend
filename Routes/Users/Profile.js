import { Router } from "express";
import { AuthCheck } from "../../Middlewares/AuthCheck.js";
import { pool } from "../../Database/Database.js";

export const ProfileRoute = Router();

ProfileRoute.get('/', AuthCheck, async (req,res) => {
    
    const details = req.ELB;

    let client;
    try {
        client = await pool.connect();
        pool.query(`SELECT NAME,EMAIL,PICTURE FROM users WHERE ID = $1`,[details.id],(err,result) => {
            if(err){
                res.status(500).json({
                    'Error' : 'Query not working'
                })
            }else{
                const name = result.rows[0].name;
                const email = result.rows[0].email;
                const picture = result.rows[0].picture;

                res.json({
                    name : name,
                    email : email,
                    Profile_Picture : picture
                })
            }
        });
    } catch (error) {
        res.status(500).json({
            'Error' : "Could not connect to database",
        })
    } finally{
        client.release();
    }
})