'use strict';
let expect = require('chai').expect;
let Logger = require('../index.js');
let path = require('path');
let fs = require('fs');
let logDir = path.join(__dirname, 'logs');
Logger.setLogDir(logDir);
let logger = new Logger('tests');

describe('Logger Success...', () => {

  describe('When instance is created', () => {
    it('file with current date should exist in logs/ directory', () => {
      let d = new Date();
      let name = d.getDate() + '-' + (d.getMonth() + 1 ) + '-' + d.getFullYear();
      expect(fs.existsSync(logDir + '/' + name + '.log')).to.equal(true);
    });
  });

  describe('Calling a method that will log a message into log file', () => {
    let should = 'Should return string with current namespace and passed args';
    describe('When logger.warning is called', () => {  
      it(should, () => {
        let message = logger.warning('some WARNING for %s', 'tests');
        expect(message).to.equal('tests - WARNING: some WARNING for tests');
      });
    });

    describe('When logger.alert is called', () => {  
      it(should, () => {
        let message = logger.alert('some ALERT for %s', 'tests');
        expect(message).to.equal('tests - ALERT: some ALERT for tests');
      });
    });

    describe('When logger.error is called', () => {  
      it(should, () => {
        let message = logger.error('some ERROR for %s', 'tests');
        expect(message).to.equal('tests - ERROR: some ERROR for tests');
      });
    });

    describe('When logger.critical is called', () => {  
      it(should, () => {
        let message = logger.critical('some CRITICAL for %s', 'tests');
        expect(message).to.equal('tests - CRITICAL: some CRITICAL for tests');
      });
    });   

    describe('When logger.info is called', () => {  
      it(should, () => {
        let message = logger.info('some INFO for %s', 'tests');
        expect(message).to.equal('tests - INFO: some INFO for tests');
      });
    });

    describe('When logger.notice is called', () => {  
      it(should, () => {
        let message = logger.notice('some NOTICE for %s', 'tests');
        expect(message).to.equal('tests - NOTICE: some NOTICE for tests');
      });
    });   

    describe('When logger.success is called', () => {  
      it(should, () => {
        let message = logger.success('some SUCCESS for %s', 'tests');
        expect(message).to.equal('tests - SUCCESS: some SUCCESS for tests');
      });
    });

    describe('When logger.badrequest is called', () => {  
      it(should, () => {
        let message = logger.badrequest('some BADREQUEST for %s', 'tests');
        expect(message)
        .to.equal('tests - BADREQUEST: some BADREQUEST for tests');
      });
    });   

    describe('When logger.unauthorized is called', () => {  
      it(should, () => {
        let message = logger.unauthorized('some UNAUTHORIZED for %s', 'tests');
        expect(message)
        .to.equal('tests - UNAUTHORIZED: some UNAUTHORIZED for tests');
      });
    }); 

  });

});