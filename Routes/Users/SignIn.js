import { Router } from "express";
import { UserCheck } from "../../Middlewares/Users/UserCheck.js";
import jwt from 'jsonwebtoken';

const SecretKey = process.env.SECRET_KEY

export const SignInRoute = Router();

SignInRoute.get('/', UserCheck, (req,res) => {
    try {
        const id = req.id;
        const name = req.name;
        const email = req.headers.email;
        const Type = req.Type;

        let token;
        if(!Type){
            token = jwt.sign({
                id : id,
                name : name,
                email : email,
                type : 'user'
            },SecretKey);
        }else{
            token = jwt.sign({
                id : id,
                name : name,
                email : email,
                type : 'admin'
            },SecretKey);
        }
        
        const bearerToken = `bearer ${token}`;
        res.cookie('ELB',bearerToken);
        if(!Type){
            res.json({
                msg : 'User signed in'
            })
        }
        else{
            res.json({
                msg : 'Admin signed in'
            })
        }
    } catch (error) {
        res.status(500).json({
            'Error' : 'Internal server error'
        })
    }

})