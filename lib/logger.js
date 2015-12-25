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
let fs = require('fs');
let path = require('path');
let util = require('util');
let debug = require('debug');
let colors = require('colors');
let logDir = path.join(path.dirname(require.main.filename), 'logs');
let stream;

module.exports = class Logger {

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
   * @description Call _runProcedure
   * @param {array} args - the passed args
   * @param {string} namespace
   */
  constructor(namespace) {
    this._runProcedure(namespace);
  }

  /**
   * @public
   * @method alert
   * @description Alert message, yellow color
   * @param {array} args - the passed args
   * @returns {string} message - formatted message
   */
  alert(...args) {
    return this._log('ALERT', args, 'yellow', 'bold');
  }

  /**
   * @public
   * @method critical
   * @description Critical message, red color
   * @param {array} args - the passed args
   * @returns {string} message - formatted message
   */
  critical(...args) {
    return this._log('CRITICAL', args, 'red', 'bold');
  }

  /**
   * @public
   * @method error
   * @description Error message, red color
   * @param {array} args - the passed args
   * @returns {string} message - formatted message
   */
  error(...args) {
    return this._log('ERROR', args, 'red', 'bold');
  }

  /**
   * @public
   * @method warning
   * @description Warning message, yellow color
   * @param {array} args - the passed args
   * @returns {string} message - formatted message
   */
  warning(...args) {
    return this._log('WARNING', args, 'yellow', 'bold');
  }

  /**
   * @public
   * @method notice
   * @description Notice message, cyan color
   * @param {array} args - the passed args
   * @returns {string} message - formatted message
   */
  notice(...args) {
    return this._log('NOTICE', args, 'cyan', 'bold');
  }

  /**
   * @public
   * @method info
   * @description Info message, cyan color
   * @param {array} args - the passed args
   * @returns {string} message - formatted message
   */
  info(...args) {
    return this._log('INFO', args, 'cyan', 'bold');
  }

  /**
   * @public
   * @method success
   * @description Success message, green color
   * @param {array} args - the passed args
   * @returns {string} message - formatted message
   */
  success(...args) {
    return this._log('SUCCESS', args, 'green', 'bold');
  }

  /**
   * @public
   * @method unauthorized
   * @description Unauthorized message, yellow color
   * @param {array} args - the passed args
   * @returns {string} message - formatted message
   */
  unauthorized(...args) {
    return this._log('UNAUTHORIZED', args, 'yellow', 'bold');
  }

  /**
   * @public
   * @method badrequest
   * @description Badrequest message, white color
   * @param {array} args - the passed args
   * @returns {string} message - formatted message
   */
  badrequest(...args) {
    return this._log('BADREQUEST', args, 'white', 'bold');
  }

  /**
   * @private
   * @method _runProcedure
   * @description Call
   * 1) _initializeProperties
   * 2) _setTypeAndDebug
   * 3) _onInitSetStream
   */
  _runProcedure(namespace) {
    this._initializeProperties(namespace);
    this._setTypeAndDebug();
    this._onInitSetStream();
  }

  /**
   * @private
   * @method _initializeProperties
   * @description Reset the _subscribedTypes and set the namespace
   * @param {string} namespace
   */
  _initializeProperties(namespace) {
    this._subscribedTypes = '';
    this._namespace = namespace;
  }

  /**
   * @private
   * @method _setTypeAndDebug
   * @description Set the _subscribedTypes and debug
   */
  _setTypeAndDebug() {
    if (process.env.TYPE) {
      if (process.env.TYPE === '*') {
        let types = 'ALERT,CRITICAL,ERROR,WARNING,NOTICE,INFO,SUCCESS,';
        types += 'UNAUTHORIZED,BADREQUEST';
        this._subscribedTypes = types;
      } else {
        this._subscribedTypes = process.env.TYPE.toUpperCase();
      }
    }
    if (process.env.DEBUG) {
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
   * @description If we're in production, we don't need debugger
   * @returns {array} args - the passed args
   */
  _defaultDebug(...args) {
    return args;
  }

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
  _log(type, args, color, style) {
    this._checkDate();
    let namespace = this._namespace;
    let message = namespace + ' - ' + type + ': ' + util.format.apply(null, args);
    stream.write('[' + new Date() + ']  ' + message + "\n");
    if (this._subscribedTypes.indexOf(type) !== -1) {
      console.log(colors[style][color]('  ' + message));
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
    let d = new Date();
    let name = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
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
