const jwt = require('jsonwebtoken')

module.exports = {
    auth: async (req, res, next) => {
        let token = await req.header('x-auth-token')
        if(!token){return res.status(401).send('Access denied. No token provided')}
        
        try{
            let decoded = jwt.verify(token,'privateKey')
            req.user = decoded
            next()
        }catch(ex){
            res.status(400).send('Invalid Token')
        }
    },
    generateToken : async (payload) => {
        await payload;

        if(payload.constructor !== Object){
            throw new Error('argument must object')
        }

        return jwt.sign(
            payload, 
            'privateKey',
            {algorithm:'HS256',expiresIn:'1h'}
            );

    },
}