var sqlWinAuth = require("mssql/msnodesqlv8");
var sql = require("mssql");
const { Pool, Client } = require('pg')
const {
    his_user,his_db1,his_db2,his_server,his_pass,
    ax_server,ax_db,pg_user,pg_db,pg_pass,pg_server
} = require('../config');
const {log} = require('../log/log')

    // config for  database
var his = {
    user: his_user,
    password: his_pass,
    server: his_server,
    database: his_db1,
    "options": {
        "encrypt": true,
        "enableArithAbort": true
        }
};
var his_fa = {
    user: his_user,
    password: his_pass,
    server: his_server,
    database: his_db2,
    "options": {
        "encrypt": true,
        "enableArithAbort": true
        }
};
var ax = {
    server: ax_server, 
    database: ax_db,
    driver : 'msnodesqlv8',
    "options": {
        "trustedConnection": true,
         "useUTC": false
      }
};

var pg = {
    user: pg_user,
    host: pg_server,
    database: pg_db,
    password: pg_pass,
    port: 5432,
}

// connect to  database
const connHis = new sql.ConnectionPool(his)
    .connect()
    .then(pool => {
        log.info('Connected to MSSQL database HIS')
      //  console.log(pool)
        
        return pool
    })
    .catch(err => log.error('Database Connection Failed! Bad Config: ', err))

const connHis_fa = new sql.ConnectionPool(his_fa)
    .connect()
    .then(pool => {
        
        log.info('Connected to MSSQL database HIS_FA')
      //  console.log(pool)
        
        return pool
    })
    .catch(err => log.error('Database Connection Failed! Bad Config: ', err))

const connAx = new sqlWinAuth.ConnectionPool(ax)
    .connect()
    .then(pool => {
        log.info('Connected to MSSQL database AX')
       // console.log( pool)
       const request = new sqlWinAuth.Request(pool)
        return request
    })
    .catch(err => log.error('Database Connection Failed! Bad Config: ', err))

const poolPg = new Pool(pg) 
const clientPg = new Client(pg) 

    
module.exports = {
    connHis
    ,connHis_fa
    ,connAx
    ,poolPg
    ,clientPg
    ,sql
}