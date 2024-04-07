import { Router } from "express";
import { AuthCheck } from "../../Middlewares/AuthCheck.js";
import { genSalt, hash } from "bcrypt";
import { pool } from "../../Database/Database.js";

export const PasswordReset = Router();

PasswordReset.get('/', AuthCheck, async (req,res) => {
    const newPassword = req.headers.password;
    const details = req.ELB;

    const salt = await genSalt(5);
    const hashedPassword = await hash(newPassword,salt);

    const id = details.id;

    let client;
    try {
        client = await pool.connect();
        client.query(`UPDATE users SET PASSWORD = $1 WHERE ID = $2`,[hashedPassword,id],(err,result) => {
            if(err){
                res.status(500).json({
                    'Error' : 'Query not working'
                })
            }else{
                res.json({
                    msg : 'Password was successfully reset'
                })
            }
        });
    } catch (error) {
        res.status(500).json({
            'Error' : 'Could not connect to the database'
        })
    }

})