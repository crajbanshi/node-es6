import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

let should = chai.should();
chai.use(chaiHttp);


var requester = chai.request(app).keepOpen();
var userData = { userid: "5bacc2e59bb8962504a6e142" };


describe('REST API testing', function() {
    before(function() {

    });

    after(function() {
        requester.close();
    });
    describe('Array', function() {
        describe('#indexOf()', function() {
            it('should return -1 when the value is not present', function(done) {
                assert.equal([1, 2, 3].indexOf(4), -1);
                done();
            });
        });
    });


    describe('GET /api', function() {

        it('respond with status message', function(done) {
            requester.get('/api').end(function(err, res) {
                chai.expect(res).to.have.status(200);
                // chai.expect(res.body).to.have.key('message');
                done();
            });
        });

    });

    describe('GET /api/getUsers', function() {
        it('respond with an array of users', function(done) {
            requester.post('/api/getUsers').send(userData).end(function(err, res) {
                chai.expect(res).to.have.status(200);
                // chai.expect(res.body).to.have.key('status');
                // chai.expect(res.body).to.have.key('data');
                done();
            });
        });
    });

});