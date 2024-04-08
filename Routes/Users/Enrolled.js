import { Router } from "express";
import { AuthCheck } from "../../Middlewares/UserAuthCheck.js";
import { pool } from "../../Database/Database.js";

export const EnrolledRoute = Router();

EnrolledRoute.get('/', AuthCheck, async (req,res) => {
    const id = req.ELB.id;
    
    let client;
    try {
        client = await pool.connect();
        client.query(`SELECT * FROM Purchased_Courses WHERE User_id = $1`,[id], async (err,result) => {
            if(err){
                res.status(500).json({
                    'Error' : 'Query not working'
                })
            }else{
                if(!result.rowCount){
                    res.json({
                        msg : 'No courses purchased'
                    })
                }
                else{
                    let arr = [];
                    await result.rows.map((element,index) => {
                        arr.push({
                            'No.' : index+1,
                            'id' : element.course_id,
                            'name' : element.course_name,
                            'Description' : element.course_description ? element.course_description : "",
                            'Language' : element.language ? element.language : "",
                            'Purchased on' : element.purchased_date_time 
                        })
                    })
                    res.json({
                        'Courses Purchased' : arr,
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
})