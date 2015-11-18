'use strict';
let Logger = require('esrol-logger');
let logger = new Logger('dummyNamespace');

// The following will write messages into log file
// You can use TYPE=* node dummy.js or TYPE=info,error node dummy.js
// to output message into console
logger.warning('Warning message');
logger.alert('Alert message');
logger.error('Error message');
logger.critical('Critical message');
logger.info('Info message');
logger.notice('Notice message');
logger.success('Success message');
logger.badrequest('Badrequest message');
logger.unauthorized('Unauthorized message');
// The debug behave just like node debug module
// and you should use the DEBUG variable
// DEBUG=dummyNamespace node dummy.js or DEBUG=* node dummy.js
// Note: the debug method does not write message into log file
logger.debug('Debug message');
// Or you can combine all of them like: 
// DEBUG=* TYPE=* node dummy.js
// ENJOY THE RAINBOW :D