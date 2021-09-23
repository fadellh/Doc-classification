const {poolPg} = require('../../db')

module.exports = {
    checkUser: async (channel_id, unit, key) => {
        try{
            return await poolPg
                .query(`
                select * from public.users 
                where 
                channel = $1
                and unit_name= $2 
                and secret_key= $3
                `,[channel_id,unit,key]);
            poolPg.end
            
            
        }catch(err){

        }
    }
}