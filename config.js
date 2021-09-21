const dotenv = require('dotenv');
const path = require('path');
const {log} = require('./log/log')

dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});  

log.info(path.resolve(__dirname, process.env.NODE_ENV + '.env'))

module.exports = {
    port : process.env.PORT,
    his_pass : process.env.HIS_PASS,
    his_server : process.env.HIS_HOST,
    his_user: process.env.HIS_USER,
    his_db1: process.env.HIS_DATA,
    his_db2: process.env.HIS_FA_DATA,
    ax_server: process.env.AX_HOST,
    ax_db: process.env.AX_DATA,
    pg_server: process.env.PG_HOST,
    pg_db: process.env.PG_DATA,
    pg_pass: process.env.PG_PASS,
    pg_user: process.env.PG_USER
}