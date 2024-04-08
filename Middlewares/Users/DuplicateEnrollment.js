import { pool } from "../../Database/Database.js";

export const DuplicateEnrollment = async (req,res,next) => {
    const courseID = req.body.id;
    const userId = req.ELB.id;
    
    let client;
    try {
        client = await pool.connect();
        client.query(`SELECT Course_Name FROM purchased_courses WHERE User_id = $1 AND Course_id = $2;`,[userId,courseID],(err,result) => {
            if(err){
                console.log(err);
                res.status(500).json({
                    'Error' : 'Query not working'
                })
            }
            else{
                if(!result.rowCount){
                    next();
                }
                else{
                    res.json({
                        'Error' : 'Already enrolled in this course'
                    })
                }
            }
        });    
    } catch (error) {
        res.status(500).json({
            'Error' : 'Could not connect to the database'
        })
    } finally{
        client.release();
    }
}