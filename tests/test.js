'use strict';
const expect = require('chai').expect;
const Logger = require('../index.js');
const path = require('path');
const fs = require('fs');
const colors = require('colors');
const logDir = path.join(__dirname, 'logs');
Logger.setLogDir(logDir);
let logger = new Logger('tests');
function rmFile() {
  const file = logger._fileByDate();
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
      const d = new Date();
      const name = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
      expect(fs.existsSync(logDir + '/' + name + '.log')).to.equal(true);
    });
  });

  const des = `Write message to file, extract the file content and search for the
    given message`;
  describe(des, () => {
    const should = `Should write message and console.log message`;
    describe('WARNING message', () => {
      beforeEach(function() {
        this.sinon.stub(console, 'log');
      });
      it(should, (done) => {
        rmFile();
        const message = logger.warning('warning', 'some WARNING for tests');
        const warning = 'tests - WARNING - warning: some WARNING for tests';
        const output = colors.bold.yellow('  ' + warning);
        expect(message).to.equal(warning);
        expect(console.log.calledWith(output)).to.be.true;
        setTimeout(() => {
          expect(getContent())
          .to.contains('tests - WARNING - warning: some WARNING for tests');
          done();
        }, 500);
      });
    });

    describe('ALERT message', () => {
      it(should, (done) => {
        rmFile();
        const message = logger.alert('alert', 'some ALERT for tests');
        expect(message)
          .to.equal('tests - ALERT - alert: some ALERT for tests');
        setTimeout(() => {
          expect(getContent())
            .to.contains('tests - ALERT - alert: some ALERT for tests');
          done();
        }, 100);
      });
    });

    describe('ERROR message', () => {
      it(should, (done) => {
        rmFile();
        const message = logger.error('error', 'some ERROR for tests');
        expect(message)
          .to.equal('tests - ERROR - error: some ERROR for tests');
        setTimeout(() => {
          expect(getContent())
            .to.contains('tests - ERROR - error: some ERROR for tests');
          done();
        }, 100);
      });
    });

    describe('CRITICAL message', () => {
      it(should, (done) => {
        rmFile();
        const message = logger.critical('critical', 'some CRITICAL for tests');
        expect(message)
          .to.equal('tests - CRITICAL - critical: some CRITICAL for tests');
        setTimeout(() => {
          expect(getContent())
          .to.contains('tests - CRITICAL - critical: some CRITICAL for tests');
          done();
        }, 100);
      });
    });

    describe('INFO message', () => {
      it(should, (done) => {
        rmFile();
        const message = logger.info('info', 'some INFO for tests');
        expect(message).to.equal('tests - INFO - info: some INFO for tests');
        setTimeout(() => {
          expect(getContent())
            .to.contains('tests - INFO - info: some INFO for tests');
          done();
        }, 100);
      });
    });

    describe('NOTICE message', () => {
      it(should, (done) => {
        rmFile();
        const message = logger.notice('notice', 'some NOTICE for tests');
        expect(message)
          .to.equal('tests - NOTICE - notice: some NOTICE for tests');
        setTimeout(() => {
          expect(getContent())
          .to.contains('tests - NOTICE - notice: some NOTICE for tests');
          done();
        }, 100);
      });
    });

    describe('SUCCESS message', () => {
      it(should, (done) => {
        rmFile();
        const message = logger.success('success', 'some SUCCESS for tests');
        expect(message)
          .to.equal('tests - SUCCESS - success: some SUCCESS for tests');
        setTimeout(() => {
          expect(getContent())
          .to.contains('tests - SUCCESS - success: some SUCCESS for tests');
          done();
        }, 100);
      });
    });

    describe('BADREQUEST message', () => {
      it(should, (done) => {
        rmFile();
        const message = logger.badrequest('badrequest', 'some BADREQUEST for tests');
        expect(message)
        .to.equal('tests - BADREQUEST - badrequest: some BADREQUEST for tests');
        setTimeout(() => {
          expect(getContent())
            .to.contains('tests - BADREQUEST - badrequest: some BADREQUEST for tests');
          done();
        }, 100);
      });
    });

    describe('UNAUTHORIZED message', () => {
      it(should, (done) => {
        rmFile();
        const message = logger.unauthorized('unauthorized', 'some UNAUTHORIZED for tests');
        expect(message)
          .to.equal('tests - UNAUTHORIZED - unauthorized: some UNAUTHORIZED for tests');
        setTimeout(() => {
          expect(getContent())
          .to.contains('tests - UNAUTHORIZED - unauthorized: some UNAUTHORIZED for tests');
          done();
        }, 100);
      });
    });

    describe('DEBUG message using default debug', () => {
      it('Should just return the message', () => {
        process.env.DEBUG = false;
        const message = logger.debug('debug', 'default debug');
        expect(message).to.equal(message);
      });
    });

    describe('Outputting all messages using TYPE env variable', () => {
      beforeEach(function() {
        this.sinon.stub(console, 'log');
      });
      it('Should output all messages with corresponding color', (done) => {
        rmFile();
        let returned = logger.warning('warning', 'some WARNING for tests');
        let message = 'tests - WARNING - warning: some WARNING for tests';
        let output = colors.bold.yellow('  ' + message);
        expect(returned).to.equal(message);
        expect(console.log.calledWith(output)).to.be.true;
        returned = logger.success('success', 'some SUCCESS for tests');
        message = 'tests - SUCCESS - success: some SUCCESS for tests';
        output = colors.bold.green('  ' + message);
        expect(returned).to.equal(message);
        expect(console.log.calledWith(output)).to.be.true;
        // todo add all of them
        setTimeout(() => {
          expect(getContent())
            .to.contains('tests - WARNING - warning: some WARNING for tests');
          expect(getContent())
            .to.contains('tests - SUCCESS - success: some SUCCESS for tests');
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
      rmFile();
      const message = logger.info('info', 'some INFO for tests');
      const info = 'tests - INFO - info: some INFO for tests';
      const output = colors.bold.yellow('  ' + info);
      expect(message).to.equal(info);
      expect(console.log.calledWith(output)).to.be.false;
      setTimeout(() => {
        expect(getContent())
          .to.contains('tests - INFO - info: some INFO for tests');
        done();
      }, 100);
    });
  });

});
