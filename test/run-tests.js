const request = require('supertest');
const assert = require('assert');
const http = require('http');
const app = require('../app');
const server = http.createServer(app);
describe('Basic tests', function() {
  let srv;
  before(done => { srv = server.listen(0, done); });
  after(done => srv.close(done));
  it('GET / returns 200', async function() {
    const res = await request(srv).get('/');
    assert.equal(res.status, 200);
    assert.ok(res.body.message);
  });
  it('POST /echo valid', async function() {
    const res = await request(srv).post('/echo').send({ text: 'hello' });
    assert.equal(res.status, 200);
    assert.equal(res.body.echoed, 'hello');
  });
  it('POST /echo invalid', async function() {
    const res = await request(srv).post('/echo').send({ text: null });
    assert.equal(res.status, 400);
  });
});
