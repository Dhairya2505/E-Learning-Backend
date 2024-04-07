export const AllCredentials = (req,res,next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if(!name){
        res.status(400).json({
            'Error' : "Name is required",
        })
    }
    else if(!email){
        res.status(400).json({
            'Error' : "Email is required",
        })
    }
    else if(!password){
        res.status(400).json({
            'Error' : "Password is required",
        })
    }
    else {
        next();
    }
}