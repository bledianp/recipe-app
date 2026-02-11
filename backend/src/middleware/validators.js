import { body, validationResult } from "express-validator";

const validateRegistration = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateRegister =[
    body('email').notEmpty().isEmail().withMessage("Email is required and must email format"),
    body('password').notEmpty().isLength({min: 6}).withMessage('Password is required and must have at least 6 chars'),
    validateRegistration
];

export const validateLogin = [
    body('email').notEmpty().isEmail().withMessage("Email is required and must email format"),
    body('password').notEmpty().withMessage('Password is required'),
    validateRegistration
]