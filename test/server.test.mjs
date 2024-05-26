import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';

describe('GET /addTwoNumbers', () => {
    // Other test cases...

    it('should return null if one of the query parameters is missing', async () => {
        const res = await request(app).get('/addTwoNumbers').query({ num1: 3 });
        expect(res.body).to.have.property('result', null);
        expect(res.body).to.have.property('statusCode', 200);
        expect(res.body).to.have.property('message', 'success');
    });

    it('should return null if query parameters are not numbers', async () => {
        const res = await request(app).get('/addTwoNumbers').query({ num1: 'a', num2: 'b' });
        expect(res.body).to.have.property('result', null);
        expect(res.body).to.have.property('statusCode', 200);
        expect(res.body).to.have.property('message', 'success');
    });

    it('should return null if no query parameters are provided', async () => {
        const res = await request(app).get('/addTwoNumbers');
        expect(res.body).to.have.property('result', null);
        expect(res.body).to.have.property('statusCode', 200);
        expect(res.body).to.have.property('message', 'success');
    });
});

