'use strict';
let expect = require('chai').expect;
let Logger = require('../index.js');
let path = require('path');
let fs = require('fs');
let colors = require('colors');
let logDir = path.join(__dirname, 'logs');
Logger.setLogDir(logDir);
let logger = new Logger('tests');
function rmFile() {
  let file = logger._fileByDate();
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
  logger = new Logger('tests');
}

function getContent() {
  return fs.readFileSync(logger._fileByDate()).toString();
}
require('mocha-sinon');

describe('Logger Success...', () => {
  describe('When instance is created', () => {
    it('file with current date should exist in logs/ directory', () => {
      let d = new Date();
      let name = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
      expect(fs.existsSync(logDir + '/' + name + '.log')).to.equal(true);
    });
  });

  let des = `Write message to file, extract the file content and search for the
    given message`;
  describe(des, () => {
    let should = `Should write message and console.log message`;
    describe('WARNING message', () => {
      beforeEach(function() {
        this.sinon.stub(console, 'log');
      });
      it(should, (done) => {
        process.env.TYPE = 'WARNING';
        rmFile();
        let message = logger.warning('some WARNING for %s', 'tests');
        let warning = 'tests - WARNING: some WARNING for tests';
        let output = colors.bold.yellow('  ' + warning);
        expect(message).to.equal(warning);
        expect(console.log.calledWith(output)).to.be.true;
        setTimeout(() => {
          expect(getContent())
          .to.contains('tests - WARNING: some WARNING for tests');
          done();
        }, 500);
      });
    });

    describe('ALERT message', () => {
      it(should, (done) => {
        rmFile();
        let message = logger.alert('some ALERT for %s', 'tests');
        expect(message).to.equal('tests - ALERT: some ALERT for tests');
        setTimeout(() => {
          expect(getContent()).to.contains('tests - ALERT: some ALERT for tests');
          done();
        }, 100);
      });
    });

    describe('ERROR message', () => {
      it(should, (done) => {
        rmFile();
        let message = logger.error('some ERROR for %s', 'tests');
        expect(message).to.equal('tests - ERROR: some ERROR for tests');
        setTimeout(() => {
          expect(getContent()).to.contains('tests - ERROR: some ERROR for tests');
          done();
        }, 100);
      });
    });

    describe('CRITICAL message', () => {
      it(should, (done) => {
        rmFile();
        let message = logger.critical('some CRITICAL for %s', 'tests');
        expect(message).to.equal('tests - CRITICAL: some CRITICAL for tests');
        setTimeout(() => {
          expect(getContent())
          .to.contains('tests - CRITICAL: some CRITICAL for tests');
          done();
        }, 100);
      });
    });

    describe('INFO message', () => {
      it(should, (done) => {
        rmFile();
        let message = logger.info('some INFO for %s', 'tests');
        expect(message).to.equal('tests - INFO: some INFO for tests');
        setTimeout(() => {
          expect(getContent()).to.contains('tests - INFO: some INFO for tests');
          done();
        }, 100);
      });
    });

    describe('NOTICE message', () => {
      it(should, (done) => {
        rmFile();
        let message = logger.notice('some NOTICE for %s', 'tests');
        expect(message).to.equal('tests - NOTICE: some NOTICE for tests');
        setTimeout(() => {
          expect(getContent())
          .to.contains('tests - NOTICE: some NOTICE for tests');
          done();
        }, 100);
      });
    });

    describe('SUCCESS message', () => {
      it(should, (done) => {
        rmFile();
        let message = logger.success('some SUCCESS for %s', 'tests');
        expect(message).to.equal('tests - SUCCESS: some SUCCESS for tests');
        setTimeout(() => {
          expect(getContent())
          .to.contains('tests - SUCCESS: some SUCCESS for tests');
          done();
        }, 100);
      });
    });

    describe('BADREQUEST message', () => {
      it(should, (done) => {
        rmFile();
        let message = logger.badrequest('some BADREQUEST for %s', 'tests');
        expect(message)
        .to.equal('tests - BADREQUEST: some BADREQUEST for tests');
        setTimeout(() => {
          expect(getContent())
          .to.contains('tests - BADREQUEST: some BADREQUEST for tests');
          done();
        }, 100);
      });
    });

    describe('UNAUTHORIZED message', () => {
      it(should, (done) => {
        rmFile();
        let message = logger.unauthorized('some UNAUTHORIZED for %s', 'tests');
        expect(message)
        .to.equal('tests - UNAUTHORIZED: some UNAUTHORIZED for tests');
        setTimeout(() => {
          expect(getContent())
          .to.contains('tests - UNAUTHORIZED: some UNAUTHORIZED for tests');
          done();
        }, 100);
      });
    });

    describe('DEBUG message using default debug', () => {
      it('Should just return the message', () => {
        process.env.DEBUG = false;
        let message = logger.debug('default debug');
        expect(message).to.equal(message);
      });
    });

    describe('Outputting all messages using TYPE env variable', () => {
      beforeEach(function() {
        this.sinon.stub(console, 'log');
      });
      it('Output all messages with corresponding color', (done) => {
        process.env.TYPE = '*';
        rmFile();
        let returned = logger.warning('some WARNING for %s', 'tests');
        let message = 'tests - WARNING: some WARNING for tests';
        let output = colors.bold.yellow('  ' + message);
        expect(returned).to.equal(message);
        expect(console.log.calledWith(output)).to.be.true;
        returned = logger.success('some SUCCESS for %s', 'tests');
        message = 'tests - SUCCESS: some SUCCESS for tests';
        output = colors.bold.green('  ' + message);
        expect(returned).to.equal(message);
        expect(console.log.calledWith(output)).to.be.true;
        // todo add all of them
        setTimeout(() => {
          expect(getContent())
          .to.contains('tests - WARNING: some WARNING for tests');
          expect(getContent())
          .to.contains('tests - SUCCESS: some SUCCESS for tests');
          done();
        }, 500);
      });
    });
  });

});

describe('Logger Fail...', () => {

  beforeEach(function() {
    this.sinon.stub(console, 'log');
  });
  describe('Messages should be outputted with the corresponding color', () => {
    it('Should return "false" when tested against wrong color', (done) => {
      process.env.TYPE = 'INFO';
      rmFile();
      let message = logger.info('some INFO for %s', 'tests');
      let info = 'tests - INFO: some INFO for tests';
      let output = colors.bold.yellow('  ' + info);
      expect(message).to.equal(info);
      expect(console.log.calledWith(output)).to.be.false;
      setTimeout(() => {
        expect(getContent())
        .to.contains('tests - INFO: some INFO for tests');
        done();
      }, 100);
    });
  });

});
