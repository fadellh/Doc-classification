const {createLogger, format, transports} = require('winston')
const { combine, timestamp,printf } = format;
 
const myFormat = printf(({ level, message, timestamp }) => {

   return `${level}: ${timestamp} [message]: ${message}`;
});


const logger = createLogger({
    level: 'info',
    format: combine(timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),myFormat),
   // defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new transports.File({ filename: './log/error.log', level: 'error' }),
      new transports.File({ filename: './log/warn.log', level: 'warn' }),
      new transports.File({ filename: './log/info.log' }),
    ],
    handleExceptions:[
      new transports.File({ filename: './log/exceptions.log' })
    ]
  });


  if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({handleExceptions:true,
      format: format.combine(timestamp(),format.colorize(),myFormat),
    }));
  }

  module.exports ={ 
    log: logger
    }