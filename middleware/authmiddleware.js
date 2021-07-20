const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req,res,next)=>{

    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token,process.env.secretString, async (err,decodedToken) =>{
            if(err){
                res.redirect('/auth/login');
            }
            else{
                next();
            }
        });   
    }
    else{
        res.redirect('/auth/login');
    }

}

const isUser = (req,res,next) =>{

    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.secretString, async (err,decodedToken) =>{
            if(err){
                res.locals.user = null;
                next();
            }
            else{
                let user = await User.findById(decodedToken.id.trim());
                res.locals.user = user;
                next();
            }
        });   
    }
    else{
        res.locals.user = null;
        next();
    }

}
module.exports ={
    requireAuth, isUser
}