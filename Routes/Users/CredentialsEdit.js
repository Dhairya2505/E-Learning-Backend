import { Router } from "express";
import { AuthCheck } from "../../Middlewares/UserAuthCheck.js";
import { pool } from "../../Database/Database.js";

export const EditCredentials = Router();

EditCredentials.post('/', AuthCheck, async (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const picture = req.body.picture;

    const id = req.ELB.id;

    let count = 0;

    let clause = '';
    if(name){
        count++;
        clause = clause+`NAME = $${count},`;
    }
    if(email){
        count++;
        clause = clause+`EMAIL = $${count},`;
    }
    if(picture){
        count++;
        clause = clause+`PICTURE = $${count},`;
    }
    count++;
    clause = clause.slice(0,-1);

    let arr = [];
    if(name){
        arr.push(name);
    }
    if(email){
        arr.push(email);
    }
    if(picture){
        arr.push(picture);
    }
    arr.push(id);

    let client;
    try {
        if(!(count-1)){
            res.json({
                msg : 'No Credentials were to be changed'
            })
        }
        else{
            client = await pool.connect();
            client.query(`UPDATE users SET ${clause} WHERE ID = $${count}`,arr,(err,result) => {
                if(err){
                    res.status(500).json({
                        'Error' : 'Query not working'
                    })
                }else{
                    res.json({
                        msg : 'Credentials updated successfully'
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