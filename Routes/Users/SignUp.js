import { Router } from "express";
import { genSalt, hash } from "bcrypt";

import { AllCredentials } from "../../Middlewares/Users/AllCredentials.js";
import { UserDuplicacy } from "../../Middlewares/Users/UserDuplicacy.js";
import { StrongPassword } from "../../Middlewares/Users/StrongPassword.js";
import { pool } from "../../Database/Database.js";

export const SignUpRoute = Router();

SignUpRoute.post('/', AllCredentials, UserDuplicacy, StrongPassword, async (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const salt = await genSalt();
    const hashedPassword = await hash(password,salt);
    
    let client;
    try {
        client = await pool.connect();
        try {
            const date = new Date();
            const time = date.getTime();
            await client.query(`INSERT INTO verificationtable (NAME, EMAIL, PASSWORD, TIME_STAMP) VALUES($1,$2,$3,$4);`,[name,email,hashedPassword,time],(err,result) => {
                if(err){
                    res.status(500).json({
                        'Error' : 'Query not working'
                    })
                }
                else{
                    res.json({
                        msg : 'Verification mail sent'
                    })
                }
            });
        } catch (error) {
            res.status(500).json({
                'Error' : 'Internal server error'
            })
        }
    } catch (error) {
        res.status(500).json({
            'Error' : "Could not connect to database",
        })
    } finally{
        client.release();
    }



})