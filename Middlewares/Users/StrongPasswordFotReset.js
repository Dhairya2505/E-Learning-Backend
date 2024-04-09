import { passwordStrength } from 'check-password-strength'

export const StrongPasswordForReset = (req,res,next) => {
    const password =  req.headers.password;

    const strength = passwordStrength(password).value;
    if(strength === 'Weak' || strength === 'Too weak'){
        res.json({
            'Error' : 'Password is too Weak'
        })
    }
    else{
        next();
    }
}