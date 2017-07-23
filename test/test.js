const chai = require('chai');
const chaiHttp = require('chai-http');
const mocha = require('mocha');

const port = process.argv[2] || process.env.PORT || 8080;

const url = `http://localhost:${port}`;

chai.use(chaiHttp);

it('accepts natural date string', (done) => {
  chai.request(url)
    .get('/December 15, 2015')
    .end((err, res) => {
      chai.expect(err).to.be.null;
      chai.expect(res).to.have.status(200);
      const json = {
        natural: "December 15, 2015",
        unix: 1450155600,
      };
      chai.expect(res.text).to.equal(JSON.stringify(json));
      done();
    });
});

it('accepts unix timestamp', (done) => {
  chai.request(url)
    .get('/1450155600')
    .end((err, res) => {
      chai.expect(err).to.be.null;
      chai.expect(res).to.have.status(200);
      const json = {
        natural: "December 15, 2015",
        unix: 1450155600,
      };
      chai.expect(res.text).to.equal(JSON.stringify(json));
      done();
    });
});

it('zero on decimal', (done) => {
  chai.request(url)
    .get('/0.35')
    .end((err, res) => {
      chai.expect(err).to.be.null;
      chai.expect(res).to.have.status(200);
      const json = {
        natural: "January 1, 1970",
        unix: 0,
      };
      chai.expect(res.text).to.equal(JSON.stringify(json));
      done();
    });
});

it('null on invalid date', (done) => {
  chai.request(url)
    .get('/Smarch 13, 1995')
    .end((err, res) => {
      chai.expect(err).to.be.null;
      chai.expect(res).to.have.status(200);
      const json = {
        natural: null,
        unix: null,
      };
      chai.expect(res.text).to.equal(JSON.stringify(json));
      done();
    });
});
