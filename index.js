import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PROT || 7001;
app.listen(PORT,() => {
    console.log(`Server is running on PORT : ${PORT}`);
})