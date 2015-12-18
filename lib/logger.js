'use strict';
let path = require('path');
let util = require('util');
let fs = require('fs');
let colors = require('colors');
let debug = require('debug');
let logDir = path.join(path.dirname(require.main.filename), 'logs');
let stream;

module.exports = class Logger {

  static setLogDir(directory) {
    logDir = directory;
  }

  constructor(namespace) {
    this._runProcedure(namespace);
  }

  alert(...args) {
    return this._log('ALERT', args, 'yellow', 'bold');
  }

  critical(...args) {
    return this._log('CRITICAL', args, 'red', 'bold');
  }

  error(...args) {
    return this._log('ERROR', args, 'red', 'bold');
  }

  warning(...args) {
    return this._log('WARNING', args, 'yellow', 'bold');
  }

  notice(...args) {
    return this._log('NOTICE', args, 'cyan', 'bold');
  }

  info(...args) {
    return this._log('INFO', args, 'cyan', 'bold');
  }

  success(...args) {
    return this._log('SUCCESS', args, 'green', 'bold');
  }

  unauthorized(...args) {
    return this._log('UNAUTHORIZED', args, 'yellow', 'bold');
  }

  badrequest(...args) {
    return this._log('BADREQUEST', args, 'white', 'bold');
  }

  debug() {}

  _runProcedure(namespace) {
    this._initializeProperties(namespace);
    this._factory();
    this._onInitSetStream();
  }

  _initializeProperties(namespace) {
    this._subscribedTypes = '';
    this._namespace = namespace;
  }

  _factory() {
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
      return this.debug = debug(this._namespace);
    }
    return this.debug = this._defaultDebug;
  }

  _onInitSetStream() {
    if (!stream) {
      this._setStream();
    }
  }

  /*
  * If we're in production, we don't need debugger
  */
  _defaultDebug() {}

  _log(type, args, color, style) {
    this._checkDate();
    let namespace = this._namespace;
    let msg = namespace + ' - ' + type + ': ' + util.format.apply(null, args);
    stream.write('[' + new Date + ']  ' + msg + "\n");
    if (this._subscribedTypes.indexOf(type) !== -1) {
      console.log (colors[style][color]('  ' + msg));
    }
    return msg;
  }

  _fileByDate() {
    let d = new Date();
    let name = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    return logDir + '/' + name + '.log';
  }

  _setStream() {
    this._file = this._fileByDate();
    stream = fs.createWriteStream(this._file, {flags: 'a'});
  }

  _endStream() {
    stream.end();
  }

  _checkDate() {
    if (this._file !== this._fileByDate()) {
      this._endStream();
      this._setStream();
    }
  }

};
