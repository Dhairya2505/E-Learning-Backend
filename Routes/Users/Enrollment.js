import { Router } from 'express';
import { AuthCheck } from '../../Middlewares/UserAuthCheck.js';
import { pool } from '../../Database/Database.js';
import { DuplicateEnrollment } from '../../Middlewares/Users/DuplicateEnrollment.js';

export const EnrollmentRoute = Router();

EnrollmentRoute.post('/',AuthCheck, DuplicateEnrollment, async (req,res) => {
    const courseId = req.body.id;
    const userId = req.ELB.id;
    
    let client;
    try {
        client = await pool.connect();
        client.query(`SELECT NAME,DESCRIPTION,LANGUAGE FROM Courses WHERE id = $1;`,[courseId], async (err,result) => {
            if(err){
                res.status(500).json({
                    'Error' : 'Query not working'
                })
            }
            else{
                if(!result.rowCount){
                    res.status(404).json({
                        'Error' : 'No such course found'
                    })
                }else{
                    await client.query(`INSERT INTO purchased_courses VALUES ($1,$2,$3,$4,$5);`,[userId,courseId,result.rows[0].name,result.rows[0].description,result.rows[0].language], async (err,result) => {
                        if(err){
                            res.status(500).json({
                                'Error' : 'Query not working'
                            }) 
                        }
                        else{
                            await client.query(`UPDATE courses SET popularity = (SELECT POPULARITY FROM courses WHERE id = $1)+1 WHERE id = $2;`,[courseId,courseId],(err,result) => {
                                if(err){
                                    res.status(500).json({
                                        'Error' : 'Query not working'
                                    }) 
                                }else{
                                    res.json({
                                        msg : 'Course purchased successfully'
                                    })
                                }
                            })
                        }
                    });
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
});