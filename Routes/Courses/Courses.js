import { Router } from 'express';
import { pool } from '../../Database/Database.js';
import { AuthCheck } from '../../Middlewares/AuthCheck.js';

export const CoursesRoute = Router();

CoursesRoute.get('/', AuthCheck, async (req,res) => {
    const page = req.query.page ? req.query.page : 1;
    const level = req.query.level;
    const language = req.query.language;
    const price = req.query.price;
    const category = req.query.category;
    const popularity = req.query.popularity;
    const rating = req.query.rating;


    let clause = 'WHERE';
    let count = 1;
    if(level){
        clause = clause+` LEVEL = $${count} AND`;
        count++;
    }
    if(language){
        clause = clause+` LANGUAGE = $${count} AND`;
        count++;
    }
    if(price){
        clause = clause+` PRICE = $${count} AND`;
        count++;
    }
    if(category){
        clause = clause+` CATEGORY = $${count} AND`;
        count++;
    }
    if(popularity){
        clause = clause+` POPULARITY = $${count} AND`;
        count++;
    }
    if(rating){
        clause = clause+` RATING = $${count} AND`;  
        count++;
    }

    if(!(clause === 'WHERE')){
        clause = clause.slice(0,-4);
    }else{
        clause = '';
    }


    const NoofPages = 10;
    const offset = ((page-1)*NoofPages);

    let arr = [];
    if(level){
        arr.push(level);
    }
    if(language){
        arr.push(language);
    }
    if(price){
        arr.push(price);
    }
    if(category){
        arr.push(category);
    }
    if(popularity){
        arr.push(popularity);
    }
    if(rating){
        arr.push(rating);
    }
    
    let client;
    try {
        client = await pool.connect();
        client.query(`SELECT ID,NAME,DESCRIPTION,PRICE,LEVEL,POPULARITY,RATING,CREATED_BY FROM courses ${clause} OFFSET ${offset} LIMIT ${NoofPages};`, arr, (err,result) => {
            if(err){
                res.status(500).json({
                    'Error' : 'Query not working'
                })
            }else{
                if(!result.rowCount){
                    if(page!=1){
                        res.status(404).json({
                            'Error' : 'Page not found'
                        })
                    }
                    else{
                        res.status(404).json({
                            msg : 'There is no course like this'
                        })
                    }
                }
                else{
                    res.json({
                        'Courses' : result.rows 
                    })
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            'Error' : 'Could not connect to the database'
        })
    } finally {
        client.release();
    }



})