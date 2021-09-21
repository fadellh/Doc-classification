const {log} = require('../log/log')
const {checkUser} = require('../query/userquery')
const {generateToken} = require('../helper/jwt')

module.exports = {
    login: async (req, res) => {
        try{
            let {channel_id,unit,key} = Object.keys(req.query).length !== 0 ? req.query : req.body
    
            if(channel_id === undefined || unit === undefined || key === undefined) {
                log.error('Mandatory Field Not Filled')
                return res.status(400).send('Mandatory Field Not Filled')
            }
            let resultPg = await checkUser(channel_id,unit,key)
            let result = resultPg.rows

            if(result.length < 1){
                res.status(401).send('Authorization Failed')
            }
            let payload = {channel: result[0].channel, unit:result[0].unit_name}
            // let token = jwt.sign({channel: result[0].channel, unit:result[0].unit_name}, 'privateKey',{algorithm:'HS256',expiresIn:'1h'});
          //  console.log(token)
            let token = await generateToken(payload)
            res.status(200).header('x-auth-token',token).send({channel: result[0].channel, unit:result[0].unit_name})

        }catch(err){
            log.error(`server error : ${err.message}`)
            return res.status(500).send(`server error : ${err.message}`)
        }
    },
}