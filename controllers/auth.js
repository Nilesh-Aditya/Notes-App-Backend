const { validationResult } = require('express-validator')
const { userAuth: User } = require("../models/auth");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


async function RegisterNewUser (req, res, next) {
    const errors = validationResult(req);
    if(errors){
        return res.status(400).json({errors:errors.array()});
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({errors: 'User Already exist'});
        }
        const new_user = await User.create({
            email,
            password
        });

        return res.status(201).json({ msg: 'success redirecting to home' });
    } 
    catch (error) {
        console.error(error)
        return res.status(500).send({error});
    }
}

async function UserLogin (req, res, next) {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ email });

        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (!auth) {
                throw ({ msg: 'Incorrect password' });
            }
        }
        else {
            const obj = { msg: 'incorrect Email-Id and password' };
            throw obj;
        }
        const id = user._id;
        const maxAge = 3 * 24 * 60 * 60;
        const token = jwt.sign({ id }, process.env.SECRET_KEY, {
            expiresIn: maxAge
        });
        
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, sameSite:'lax' });
        return res.status(201).json({user:"Login Success"});

    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

module.exports = {
    RegisterNewUser,
    UserLogin
}