import { Router } from "express";
import { AdminAuthCheck } from "../../Middlewares/SuperAdmin/AdminAuthCheck.js";
import { pool } from "../../Database/Database.js";

export const DeleteCourse = Router();

DeleteCourse.post('/', AdminAuthCheck, async (req,res) => {
    const courseId = req.body.id;

    let client;
    try {
        client = await pool.connect();
        client.query(`DELETE FROM Courses WHERE id = $1`,[courseId], async (err,reslut) => {
            if(err){
                res.status(500).json({
                    'Error' : 'Query not working'
                })
            }else{
                await client.query(`DELETE FROM purchased_courses WHERE Course_id = $1`,[courseId],(err,result) => {
                    if(err){
                        res.status(500).json({
                            'Error' : 'Query not working'
                        })
                    }else{
                        res.json({
                            msg : 'Course deleted successfully'
                        })
                    }
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            'Error' : 'Could not connect to the database'
        })
    } finally {
        client.release();
    }
})