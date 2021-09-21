const request = require('supertest')
const {generateToken} = require('../../helper/jwt')
let server;

describe('auth middleware',()=>{
    beforeEach(()=> {server = require('../../index'); })
    afterEach(()=> {server.close() })

    let token;
    const exec = async () => {
        return await request(server)
            .get('/api/v1/rpa-cl/clrefno')
            .set('x-auth-token',token)
            .send('unit=2005')
            .send('invoiceNo=OIV1902060228')
            .send('custAccount=20300120')
    }
    
    it('should return 400 if token invalid', async ()=> {
        token = 'sa'
        const res = await exec()
        expect(res.status).toBe(400)
    })

    // it('should return 401 if no token', async ()=> {
    //     // token = ''
    //     const res = request(server)
    //     .get('/api/v1/rpa-cl/clrefno')
    //     .set('x-auth-token','')
    //     .send('unit=2005')
    //     .send('invoiceNo=OIV1902060228')
    //     .send('custAccount=20300120')
    //     expect(res.status).toBe(401)
    // })

    beforeEach(async ()=> {
         token = await generateToken({channel: 1})
    })

    it('should return 200 if token valid', async ()=> {
        const res = await exec()
        expect(res.status).toBe(200)
    })


})
