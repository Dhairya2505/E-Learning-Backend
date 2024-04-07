import { Router } from "express"

import { AllCredentials } from "../../Middlewares/Users/AllCredentials.js";
import { UserDuplicacy } from "../../Middlewares/Users/UserDuplicacy.js";

export const SignUpRoute = Router();

SignUpRoute.post('/', AllCredentials, UserDuplicacy,(req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

})