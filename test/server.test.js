const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../server'); // Adjust the path to where your app is defined

describe('GET /addTwoNumbers', () => {
    it('should return the sum of two positive numbers', (done) => {
        request(app)
            .get('/addTwoNumbers')
            .query({ num1: 3, num2: 5 })
            .end((err, res) => {
                expect(res.body).to.have.property('result', 8);
                expect(res.body).to.have.property('statusCode', 200);
                expect(res.body).to.have.property('message', 'success');
                done();
            });
    });

    it('should return the sum of a positive and a negative number', (done) => {
        request(app)
            .get('/addTwoNumbers')
            .query({ num1: -3, num2: 5 })
            .end((err, res) => {
                expect(res.body).to.have.property('result', 2);
                expect(res.body).to.have.property('statusCode', 200);
                expect(res.body).to.have.property('message', 'success');
                done();
            });
    });

    it('should return the sum of two negative numbers', (done) => {
        request(app)
            .get('/addTwoNumbers')
            .query({ num1: -3, num2: -5 })
            .end((err, res) => {
                expect(res.body).to.have.property('result', -8);
                expect(res.body).to.have.property('statusCode', 200);
                expect(res.body).to.have.property('message', 'success');
                done();
            });
    });

    it('should return NaN if one of the query parameters is missing', (done) => {
        request(app)
            .get('/addTwoNumbers')
            .query({ num1: 3 })
            .end((err, res) => {
                expect(res.body).to.have.property('result').that.is.NaN;
                expect(res.body).to.have.property('statusCode', 200);
                expect(res.body).to.have.property('message', 'success');
                done();
            });
    });

    it('should return NaN if query parameters are not numbers', (done) => {
        request(app)
            .get('/addTwoNumbers')
            .query({ num1: 'a', num2: 'b' })
            .end((err, res) => {
                expect(res.body).to.have.property('result').that.is.NaN;
                expect(res.body).to.have.property('statusCode', 200);
                expect(res.body).to.have.property('message', 'success');
                done();
            });
    });

    it('should handle large numbers correctly', (done) => {
        request(app)
            .get('/addTwoNumbers')
            .query({ num1: 1e9, num2: 1e9 })
            .end((err, res) => {
                expect(res.body).to.have.property('result', 2e9);
                expect(res.body).to.have.property('statusCode', 200);
                expect(res.body).to.have.property('message', 'success');
                done();
            });
    });

    it('should return NaN if no query parameters are provided', (done) => {
        request(app)
            .get('/addTwoNumbers')
            .end((err, res) => {
                expect(res.body).to.have.property('result').that.is.NaN;
                expect(res.body).to.have.property('statusCode', 200);
                expect(res.body).to.have.property('message', 'success');
                done();
            });
    });
});
