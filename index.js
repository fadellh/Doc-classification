const debug = require('debug')('myapp')
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')
const {port} = require('./config') 
const multer = require('multer')
var upload = multer()
const {log} = require('./log/log')

const express = require('express')
const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(upload.array()); 
app.use(express.static('public'));


if(app.get('env') === 'development'){
  app.use(morgan('tiny'))
  debug('Development App')
  log.info('Development App')
}else if(app.get('env') === 'production'){
  log.info('Production App')
}else{
  log.info('Testing App')
}

app.get('/', (req, res) => {
    res.status(200).send('<h1>API READY</h1>');
  });
;
  const {
    user
     } = require('./router');

app.use('/api/v1', user);


const server = app.listen(port, () => {
  log.info(`API listening at http://localhost:${port}`)
})

module.exports = server