/**
 * @author Ivaylo Ivanov
 * @public
 * @class Logger
 * @description Write different type of messages, create daily log files and
 * output colored messages to the console
 * @requires fs
 * @requires path
 * @requires util
 * @requires debug
 * @requires colors
 */
'use strict';
const fs = require('fs');
const path = require('path');
const debug = require('debug');
const colors = require('colors');
const isProd = process.env.NODE_ENV === 'production';
let logDir = path.join(path.dirname(require.main.filename), 'logs');
let stream;

module.exports = class Logger {

  static get types() {
    return [
      'ALERT',
      'BADREQUEST',
      'CRITICAL',
      'ERROR',
      'INFO',
      'WARNING',
      'NOTICE',
      'SUCCESS',
      'UNAUTHORIZED'
    ].join();
  }

  static get isDebugEnabled() {
    return process.env.DEBUG;
  }

  static get enabledTypes() {
    return process.env.LOGGER_TYPES;
  }

  /**
   * @public
   * @method setLogDir
   * @description set logs directory
   * @param {string} directory - abs path to the folder
   */
  static setLogDir(directory) {
    logDir = directory;
  }

  /**
   * @private
   * @method constructor
   * @param {string} namespace
   */
  constructor(namespace) {
    this._initializeProperties(namespace);
    this._setTypeAndDebug();
    this._onInitSetStream();
  }

  /**
   * @public
   * @method alert
   * @description Alert message, yellow color
   * @param {string} kind - additional info about the operation
   * @param {array} message
   * @returns {string} message - formatted message
   */
  alert(kind, message) {
    return this._log('ALERT', kind, message, 'yellow', 'bold');
  }

  /**
   * @public
   * @method critical
   * @description Critical message, red color
   * @param {string} kind - additional info about the operation
   * @param {array} message
   * @returns {string} message - formatted message
   */
  critical(kind, message) {
    return this._log('CRITICAL', kind, message, 'red', 'bold');
  }

  /**
   * @public
   * @method error
   * @description Error message, red color
   * @param {string} kind - additional info about the operation
   * @param {array} message
   * @returns {string} message - formatted message
   */
  error(kind, message) {
    return this._log('ERROR', kind, message, 'red', 'bold');
  }

  /**
   * @public
   * @method warning
   * @description Warning message, yellow color
   * @param {string} kind - additional info about the operation
   * @param {array} message
   * @returns {string} message - formatted message
   */
  warning(kind, message) {
    return this._log('WARNING', kind, message, 'yellow', 'bold');
  }

  /**
   * @public
   * @method notice
   * @description Notice message, cyan color
   * @param {string} kind - additional info about the operation
   * @param {array} message
   * @returns {string} message - formatted message
   */
  notice(kind, message) {
    return this._log('NOTICE', kind, message, 'cyan', 'bold');
  }

  /**
   * @public
   * @method info
   * @description Info message, cyan color
   * @param {string} kind - additional info about the operation
   * @param {array} message
   * @returns {string} message - formatted message
   */
  info(kind, message) {
    return this._log('INFO', kind, message, 'cyan', 'bold');
  }

  /**
   * @public
   * @method success
   * @description Success message, green color
   * @param {string} kind - additional info about the operation
   * @param {array} message
   * @returns {string} message - formatted message
   */
  success(kind, message) {
    return this._log('SUCCESS', kind, message, 'green', 'bold');
  }

  /**
   * @public
   * @method unauthorized
   * @description Unauthorized message, yellow color
   * @param {string} kind - additional info about the operation
   * @param {array} message
   * @returns {string} message - formatted message
   */
  unauthorized(kind, message) {
    return this._log('UNAUTHORIZED', kind, message, 'yellow', 'bold');
  }

  /**
   * @public
   * @method badrequest
   * @description Badrequest message, white color
   * @param {string} kind - additional info about the operation
   * @param {array} message
   * @returns {string} message - formatted message
   */
  badrequest(kind, message) {
    return this._log('BADREQUEST', kind, message, 'white', 'bold');
  }

  /**
   * @private
   * @method _initializeProperties
   * @description Reset the _subscribedTypes and set the namespace
   * @param {string} namespace
   */
  _initializeProperties(namespace) {
    if (!namespace) {
      throw new Error('Logger must be initialized with namespace param');
    }
    this._subscribedTypes = '';
    this._namespace = namespace;
  }

  /**
   * @private
   * @method _setTypeAndDebug
   * @description Set the _subscribedTypes and debug
   */
  _setTypeAndDebug() {
    /*istanbul ignore else*/
    if (Logger.enabledTypes) {
      if (Logger.enabledTypes === '*') {
        this._subscribedTypes = Logger.types;
      } else {
        this._subscribedTypes = Logger.enabledTypes.toUpperCase();
      }
    } else if (!isProd) {
      this._subscribedTypes = Logger.types;
    }
    if (Logger.isDebugEnabled) {
      this.debug = debug(this._namespace);
    } else {
      this.debug = this._defaultDebug;
    }
  }

  /**
   * @private
   * @method _onInitSetStream
   * @description Call _setStream if there is no stream
   */
  _onInitSetStream() {
    if (!stream) {
      this._setStream();
    }
  }

  /**
   * @private
   * @method _defaultDebug
   * @description If no debugger is specified
   * @returns {array} args - the passed args
   */
  _defaultDebug() {}

  /**
   * @private
   * @method _log
   * @description Log message to the file and if the message type is in
   * _subscribedTypes, console.log it as well
   * @param {string} type - message type
   * @param {array} args - message to log
   * @param {string} color - the color for the consol
   * @param {string} style - the style for the consol
   * @returns {string} message - the formatted message
   */
  _log(type, kind, message, color, style) {
    /*eslint-disable */
    const newLine = "\n";
    /*eslint-enable */
    this._checkDate();
    if (typeof message === 'object') {
      message = JSON.stringify(message, null, 4);
    }
    message = this._namespace + ' - ' + type + ' - ' + kind + ': ' + message;
    stream.write('[' + new Date() + ']  ' + message + newLine);
    /*istanbul ignore else*/
    if (!isProd && this._subscribedTypes.indexOf(type) !== -1) {
      /*eslint-disable */
      console.log(colors[style][color]('  ' + message));
      /*eslint-enable */
    }
    return message;
  }

  /**
   * @private
   * @method _fileByDate
   * @description Creates a file name per date eg 31.12.2015.log
   * @returns {string} message - the formatted message
   */
  _fileByDate() {
    const d = new Date();
    const name = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    return logDir + '/' + name + '.log';
  }

  /**
   * @private
   * @method _setStream
   * @description Get a file with name per date and create write stream
   */
  _setStream() {
    this._file = this._fileByDate();
    stream = fs.createWriteStream(this._file, {flags: 'a'});
  }

  /**
   * @public
   * @method endStream
   * @description End stream
   */
  endStream() {
    stream.end();
    stream = undefined;
  }

  /**
   * @private
   * @method _checkDate
   * @description Check if the current file name is the same as the current
   * date. If not, end the stream and create a new one
   */
  _checkDate() {
    /* istanbul ignore else */
    if (this._file !== this._fileByDate()) {
      this.endStream();
      this._setStream();
    }
  }

};
