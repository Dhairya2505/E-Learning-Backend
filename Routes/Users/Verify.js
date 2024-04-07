import { Router } from 'express';
import { UserDuplicacy } from '../../Middlewares/Users/UserDuplicacy.js';
import { pool } from '../../Database/Database.js';
import { nanoid } from 'nanoid';

export const VerifyRoute = Router();

VerifyRoute.get('/', UserDuplicacy, async (req,res) => {
    
    const email = req.query.m;

    let client;

    try {
        client = await pool.connect();
        try {
            const id = nanoid(20);
            client.query(`SELECT * FROM verificationtable WHERE EMAIL = $1;`,[email],(err,result) => {
                if(err){
                    res.status(500).json({
                        'Error' : 'Query not working'
                    })
                }else{
                    if(!result.rowCount){
                        res.status(500).json({
                            'Error' : 'Internal server error'
                        })
                    }else{
                        client.query(`INSERT INTO users (ID, NAME, EMAIL, PASSWORD, PICTURE) VALUES ($1,$2,$3,$4,$5);`,[id,result.rows[0].name,result.rows[0].email,result.rows[0].password,""],(err,result) => {
                            if(err){
                                // console.log(err);
                                res.status(500).json({
                                    'Error' : 'Query not working'
                                })
                            }else{
                                client.query(`DELETE FROM verificationtable WHERE EMAIL = $1;`,[email],(err,result) => {
                                    if(err){
                                        res.status(500).json({
                                            'Error' : 'Query not working'
                                        })
                                    }
                                    else{
                                        res.json({
                                            msg : "User created successfully",
                                        })
                                    }
                                });
                            }
                        });
                    }
                }
            });
        } catch (error) {
            res.status(500).json({
                'Error' : 'Internal server Error',
            })
        }
    } catch (error) {
        res.status(500).json({
            'Error' : "Could not connect to database",
        })
    } finally {
        client.release();
    }
})