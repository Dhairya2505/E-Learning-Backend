import { Router } from "express";
import { AdminAuthCheck } from "../../Middlewares/SuperAdmin/AdminAuthCheck.js";
import { nanoid } from "nanoid";
import { pool } from "../../Database/Database.js";

export const CreateCourseRoute = Router();

CreateCourseRoute.post('/', AdminAuthCheck, async (req,res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const level = req.body.level;
    const category = req.body.category;
    const language = req.body.language;
    const creator = req.body.creator;

    const id = nanoid(30);
    const popularity = 0;
    const rating = ((Math.floor((Math.random()*5)*10)/10));

    let client;
    try {
        client = await pool.connect();
        client.query(`INSERT INTO Courses (ID, NAME, DESCRIPTION, PRICE, LEVEL, CATEGORY, POPULARITY, LANGUAGE, RATING, CREATED_BY) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);`,[id,name,description ? description : "",price,level ? level : "",category ? category : "",popularity,language ? language : "",rating,creator ? creator : ""],(err,result) => {
            if(err){
                res.status(500).json({
                    'Error' : 'Query not working'
                })
            }else{
                res.json({
                    msg : 'Course created successfully',
                    id : id
                })
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