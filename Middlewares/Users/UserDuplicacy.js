import { pool } from "../../Database/Database.js";

export const UserDuplicacy = async (req,res,next) => {
    const email = req.body.email;
    
    let client;
    try {
        client = await pool.connect();
        try {
            client.query(`SELECT EMAIL FROM Users WHERE EMAIL = $1;`,[email],(err,result) => {
                if(err){
                    res.status(500).json({
                        'Error' : "Query not working",
                    })
                }
                else{
                    if(!result.rowCount){
                        next();
                    }
                    else{
                        res.json({
                            'Error' : "Email already in use",
                        })
                    }
                }
            });
        } catch (error) {
            res.status(500).json({
                'Error' : "Internal server error"
            })
        }
    } catch (error) {
        res.status(500).json({
            'Error' : "Could not connect to database",
        })
    }
    finally{
        client.release();
    }

}