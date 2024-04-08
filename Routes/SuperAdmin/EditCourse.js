import { Router } from 'express';
import { AdminAuthCheck } from '../../Middlewares/SuperAdmin/AdminAuthCheck.js';
import { pool } from '../../Database/Database.js';

export const EditCourseRoute = Router();

EditCourseRoute.post('/', AdminAuthCheck, async (req,res) => {
    const courseId = req.body.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const level = req.body.level;
    const category = req.body.category;
    const language = req.body.language;
    const creator = req.body.creator;

    let count = 0;

    let clause = '';
    if(name){
        count++;
        clause = clause+`NAME = $${count},`;
    }
    if(description){
        count++;
        clause = clause+`DESCRIPTION = $${count},`;
    }
    if(price){
        count++;
        clause = clause+`PRICE = $${count},`;
    }
    if(level){
        count++;
        clause = clause+`LEVEL = $${count},`;
    }
    if(category){
        count++;
        clause = clause+`CATEGORY = $${count},`;
    }
    if(language){
        count++;
        clause = clause+`LANGUAGE = $${count},`;
    }
    if(creator){
        count++;
        clause = clause+`CREATED_BY = $${count},`;
    }
    count++;
    clause = clause.slice(0,-1);

    let arr =[];
    if(name){
        arr.push(name);
    }
    if(description){
        arr.push(description);
    }
    if(price){
        arr.push(price);
    }
    if(level){
        arr.push(level);    
    }
    if(category){
        arr.push(category);
    }
    if(language){
        arr.push(language);
    }
    if(creator){
        arr.push(creator);
    }

    arr.push(courseId);

    let client;
    try {
        if(!(count-1)){
            res.json({
                msg : 'No Credentials were to be changed'
            })
        }
        else{
            client = await pool.connect();
            client.query(`UPDATE courses SET ${clause} WHERE ID = $${count}`,arr,(err,result) => {
                if(err){
                    res.status(500).json({
                        'Error' : 'Query not working'
                    })
                }else{
                    res.json({
                        msg : 'Course updated successfully'
                    })
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            'Error' : "Could not connect to database",
        })
    } finally {
        if(count-1){
            client.release();
        }
    }
})