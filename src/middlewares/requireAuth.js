const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = mongoose.model('User');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).send({error : "Unauthorized"});
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'my_secret_key', async (err, payload) => {
        if(err) return res.status(401).send({error : err.message});
        
        const {userId} = payload;

        const user = await userSchema.findById(userId);

        req.user = user;
        next();
    });
};