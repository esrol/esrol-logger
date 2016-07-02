[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

# esrol-logger
Write different type of messages, create daily log files and output colored messages to the console.

*Part of [Esrol](https://github.com/esrol/esrol)*

## Installation

```sh
$ npm install --save esrol-logger
```
## Node Version Compatibility

| Node Version |
| ---- |
| >= 4.x |

## Examples

```js
'use strict';
let Logger = require('esrol-logger');
let logger = new Logger('your-namespace');

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

```

## Logger

## Methods
<dl>
<dt><a href="#setLogDir">setLogDir(directory)</a></dt>
<dd><p>set logs directory</p>
</dd>
<dt><a href="#alert">alert(kind, message)</a> ⇒ <code>string</code></dt>
<dd><p>Alert message, yellow color</p>
</dd>
<dt><a href="#critical">critical(kind, message)</a> ⇒ <code>string</code></dt>
<dd><p>Critical message, red color</p>
</dd>
<dt><a href="#error">error(kind, message)</a> ⇒ <code>string</code></dt>
<dd><p>Error message, red color</p>
</dd>
<dt><a href="#warning">warning(kind, message)</a> ⇒ <code>string</code></dt>
<dd><p>Warning message, yellow color</p>
</dd>
<dt><a href="#notice">notice(kind, message)</a> ⇒ <code>string</code></dt>
<dd><p>Notice message, cyan color</p>
</dd>
<dt><a href="#info">info(kind, message)</a> ⇒ <code>string</code></dt>
<dd><p>Info message, cyan color</p>
</dd>
<dt><a href="#success">success(kind, message)</a> ⇒ <code>string</code></dt>
<dd><p>Success message, green color</p>
</dd>
<dt><a href="#unauthorized">unauthorized(kind, message)</a> ⇒ <code>string</code></dt>
<dd><p>Unauthorized message, yellow color</p>
</dd>
<dt><a href="#badrequest">badrequest(kind, message)</a> ⇒ <code>string</code></dt>
<dd><p>Badrequest message, white color</p>
</dd>
</dl>

<a name="setLogDir"></a>

## static method setLogDir(directory)
set logs directory

| Param | Type | Description |
| --- | --- | --- |
| directory | <code>string</code> | abs path to the folder |

<a name="alert"></a>

## alert(kind, message) ⇒ <code>string</code>
Alert message, yellow color

**Returns**: <code>string</code> - message - formatted message  

| Param | Type | Description |
| --- | --- | --- |
| kind | <code>string</code> | additional info about the operation |
| message | <code>mixed</code> | the message to be written |

<a name="critical"></a>

## critical(kind, message) ⇒ <code>string</code>
Critical message, red color

**Returns**: <code>string</code> - message - formatted message  

| Param | Type | Description |
| --- | --- | --- |
| kind | <code>string</code> | additional info about the operation |
| message | <code>mixed</code> | the message to be written |

<a name="error"></a>

## error(kind, message) ⇒ <code>string</code>
Error message, red color

**Returns**: <code>string</code> - message - formatted message  

| Param | Type | Description |
| --- | --- | --- |
| kind | <code>string</code> | additional info about the operation |
| message | <code>mixed</code> | the message to be written |

<a name="warning"></a>

## warning(kind, message) ⇒ <code>string</code>
Warning message, yellow color

**Returns**: <code>string</code> - message - formatted message  

| Param | Type | Description |
| --- | --- | --- |
| kind | <code>string</code> | additional info about the operation |
| message | <code>mixed</code> | the message to be written |

<a name="notice"></a>

## notice(kind, message) ⇒ <code>string</code>
Notice message, cyan color

**Returns**: <code>string</code> - message - formatted message  

| Param | Type | Description |
| --- | --- | --- |
| kind | <code>string</code> | additional info about the operation |
| message | <code>mixed</code> | the message to be written |

<a name="info"></a>

## info(kind, message) ⇒ <code>string</code>
Info message, cyan color

**Returns**: <code>string</code> - message - formatted message  

| Param | Type | Description |
| --- | --- | --- |
| kind | <code>string</code> | additional info about the operation |
| message | <code>mixed</code> | the message to be written |

<a name="success"></a>

## success(kind, message) ⇒ <code>string</code>
Success message, green color

**Returns**: <code>string</code> - message - formatted message  

| Param | Type | Description |
| --- | --- | --- |
| kind | <code>string</code> | additional info about the operation |
| message | <code>mixed</code> | the message to be written |

<a name="unauthorized"></a>

## unauthorized(kind, message) ⇒ <code>string</code>
Unauthorized message, yellow color

**Returns**: <code>string</code> - message - formatted message  

| Param | Type | Description |
| --- | --- | --- |
| kind | <code>string</code> | additional info about the operation |
| message | <code>mixed</code> | the message to be written |

<a name="badrequest"></a>

## badrequest(kind, message) ⇒ <code>string</code>
Badrequest message, white color

**Returns**: <code>string</code> - message - formatted message  

| Param | Type | Description |
| --- | --- | --- |
| kind | <code>string</code> | additional info about the operation |
| message | <code>mixed</code> | the message to be written |

## Note

If `NODE_ENV=production` the message will not be shown in the console

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## License

[MIT](https://github.com/esrol/esrol-servers/blob/master/LICENSE)

[npm-image]: https://badge.fury.io/js/esrol-logger.svg
[npm-url]: https://npmjs.org/package/esrol-logger
[travis-image]: https://travis-ci.org/esrol/esrol-logger.svg?branch=master
[travis-url]: https://travis-ci.org/esrol/esrol-logger
[coveralls-image]: https://coveralls.io/repos/esrol/esrol-logger/badge.svg
[coveralls-url]: https://coveralls.io/r/esrol/esrol-logger