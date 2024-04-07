import { compare } from "bcrypt";
import { pool } from "../../Database/Database.js";

export const UserCheck = async (req,res,next) => {
    
    const email = req.headers.email;
    const password = req.headers.password;
    
    let client;
    
    try {
        client = await pool.connect();
        try {
            client.query(`SELECT ID,NAME,EMAIL,PASSWORD FROM users WHERE EMAIL = $1`,[email],(err,result1) => {
                if(err){
                    res.status(500).json({
                        'Error' : 'Query not working'
                    })
                }
                else{
                    const hashedPassword = result1.rows[0].password;
                    compare(password,hashedPassword,(err,result2) => {
                        if(result2){
                            req.name = result1.rows[0].name;
                            req.id = result1.rows[0].id;
                            next();
                        }
                        else{
                            res.status(401).json({
                                'Error' : 'Unauthorized'
                            })
                        }
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
    } finally {
        client.release();
    }
}