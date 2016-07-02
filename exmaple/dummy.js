'use strict';
const Logger = require('../');
const logger = new Logger('your-namespace');

// The following will write messages into log file
// You can use LOGGER_TYPES=* node dummy.js or LOGGER_TYPES=info,error node dummy.js
// to output message into console
logger.warning('w', 'Warning message');
logger.alert('a', 'Alert message');
logger.error('e', 'Error message');
logger.critical('c', 'Critical message');
logger.info('i', 'Info message');
logger.notice('n', 'Notice message');
logger.success('s', 'Success message');
logger.badrequest('b', 'Badrequest message');
logger.unauthorized('login', {username: 'dummy', password: 'qwerty123'});
// The debug behave just like node debug module
// and you should use the DEBUG variable
// DEBUG=your-namespace node dummy.js or DEBUG=* node dummy.js
// Note: the debug method does not write message into log file
logger.debug('Debug message');
// Or you can combine all of them like:
// DEBUG=* LOGGER_TYPES=* node dummy.js
// ENJOY THE RAINBOW :D
