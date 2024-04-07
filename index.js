import express from 'express';
import bodyParser from 'body-parser';
import { SignUpRoute } from './Routes/Users/SignUp.js';
import { VerifyRoute } from './Routes/Users/Verify.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/signup',SignUpRoute);
app.use('/verify',VerifyRoute);

const PORT = process.env.PROT || 7001;
app.listen(PORT,() => {
    console.log(`Server is running on PORT : ${PORT}`);
})