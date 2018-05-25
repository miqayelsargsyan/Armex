const log4js = require('log4js');

log4js.configure({
  appenders: {
    cheeseLogs: { type: 'file', filename: 'cheese.log' },
    console: { type: 'console' }
  },
  categories: {
    cheese: { appenders: ['cheeseLogs'], level: 'error' },
    another: { appenders: ['console'], level: 'trace' },
    default: { appenders: ['console', 'cheeseLogs'], level: 'trace' }
  }
});


const logger = log4js.getLogger('cheese');
// only errors and above get logged.

// these will not appear (logging level beneath error)
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.log('Something funny about cheese.');
logger.warn('Cheese is quite smelly.');
// these end up only in cheese.log
logger.error('Cheese %s is too ripe!', 'gouda');
logger.fatal('Cheese was breeding ground for listeria.');

// these don't end up in cheese.log, but will appear on the console
const anotherLogger = log4js.getLogger('another');
anotherLogger.debug('Just checking');

// will also go to console and cheese.log, since that's configured for all categories
const pantsLog = log4js.getLogger('pants');
pantsLog.debug('Something for pants');

module.exports = {logger}