import { passwordStrength } from 'check-password-strength'

export const StrongPassword = (req,res,next) => {
    const password =  req.body.password;

    const strength = passwordStrength(password).value;
    if(strength === 'Weak'){
        res.json({
            'Error' : 'Password is too Weak'
        })
    }
    else{
        next();
    }
}