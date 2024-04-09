import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

export const UserAuthCheck = (req,res,next) => {
    const bearerToken = req.cookies?.ELB;
    const token = bearerToken?.split(' ')[1];
    jwt.verify(token,secretKey,(err,result) => {
        if(err){
            res.status(401).json({
                'Error' : 'Unauthorized'
            })
        }else{
            if(result.type === 'user'){
                req.ELB = result;
                next();
            }
            else{
                res.status(401).json({
                    'Error' : 'Unauthorized'
                })  
            }
        }
    });
}