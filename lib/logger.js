'use strict';
let debug = require('debug');
let Errors = require('xena-errors');
let fs = require('fs');
let stream;

module.exports = class Logger {

  constructor(namespace, environment) {
    this._runProcedure(namespace, environment);
  }

  emergency() {
    this._log('EMERGENCY', args, 'red', 'bold');
  }

  alert() { 
    this._log('ALERT', args, 'yellow', 'bold');
  }

  critical() {
    this._log('CRITICAL', args, 'red', 'bold');
  }

  error() {
    this._log('ERROR', args, 'red', 'bold');
  }

  warning() { 
    this._log('WARNING', args, 'yellow', 'bold');
  }

  notice() {   
    this._log('NOTICE', args, 'cyan', 'bold');
  }

  info() {      
    this._log('INFO', args, 'cyan', 'bold');
  }

  success() {       
    this._log('SUCCESS', args, 'green', 'bold');
  }  

  unauthorized() {     
    this._log('UNAUTHORIZED', args, 'yellow', 'bold');
  }

  badrequest() {  
    this._log('BADREQUEST', args, 'white', 'bold');
  }
  
  debug() {

  }  

  _runProcedure(namespace, environment) {
    this._initializeProperties(namespace, environment);
    this._factory();
    this._registerErrors();    
    this._createStream();
  } 

  _initializeProperties(namespace, environment) {
    this._namespace = namespace;
    this._environment = environment;
  } 

  _factory() {
    this._Errors = new Errors();
    if (this.environment === 'production') {
      return this._Debug = this._defaultDebug;
    }
  } 

  /*
  * If we're in production, we don't need debugger
  */
  _defaultDebug() {
    
  }

  _registerErrors() {
     
  }  

  _log() {
    
  } 

  _fileByDate() {
    let d = new Date();
    let name = d.getDate() + '-' + (d.getMonth() + 1 ) + '-' + d.getFullYear();
    return this._folder + '/' + name + '.log';
  }

  _setStream() {
    this._file = this._fileByDate();
    stream = fs.createWriteStream(this._file, { flags: 'a' });        
  }

  _endStream() {
    stream.end();
  }   

  _checkDate() {
    if (this._file != this._fileByDate()) {
      this._endStream();
      this._stream = this._setStream();
    }
  }   

};
