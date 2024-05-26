import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';

describe('GET /addTwoNumbers', () => {
    it('should return the sum of two positive numbers', async () => {
        const res = await request(app).get('/addTwoNumbers').query({ num1: 3, num2: 5 });
        expect(res.body).to.have.property('result', 8);
        expect(res.body).to.have.property('statusCode', 200);
        expect(res.body).to.have.property('message', 'success');
    });

    it('should return the sum of a positive and a negative number', async () => {
        const res = await request(app).get('/addTwoNumbers').query({ num1: -3, num2: 5 });
        expect(res.body).to.have.property('result', 2);
        expect(res.body).to.have.property('statusCode', 200);
        expect(res.body).to.have.property('message', 'success');
    });

    it('should return the sum of two negative numbers', async () => {
        const res = await request(app).get('/addTwoNumbers').query({ num1: -3, num2: -5 });
        expect(res.body).to.have.property('result', -8);
        expect(res.body).to.have.property('statusCode', 200);
        expect(res.body).to.have.property('message', 'success');
    });

    it('should return NaN if one of the query parameters is missing', async () => {
        const res = await request(app).get('/addTwoNumbers').query({ num1: 3 });
        expect(res.body).to.have.property('result').that.is.NaN;
        expect(res.body).to.have.property('statusCode', 200);
        expect(res.body).to.have.property('message', 'success');
    });

    it('should return NaN if query parameters are not numbers', async () => {
        const res = await request(app).get('/addTwoNumbers').query({ num1: 'a', num2: 'b' });
        expect(res.body).to.have.property('result').that.is.NaN;
        expect(res.body).to.have.property('statusCode', 200);
        expect(res.body).to.have.property('message', 'success');
    });

    it('should handle large numbers correctly', async () => {
        const res = await request(app).get('/addTwoNumbers').query({ num1: 1e9, num2: 1e9 });
        expect(res.body).to.have.property('result', 2e9);
        expect(res.body).to.have.property('statusCode', 200);
        expect(res.body).to.have.property('message', 'success');
    });

    it('should return NaN if no query parameters are provided', async () => {
        const res = await request(app).get('/addTwoNumbers');
        expect(res.body).to.have.property('result').that.is.NaN;
        expect(res.body).to.have.property('statusCode', 200);
        expect(res.body).to.have.property('message', 'success');
    });
});

