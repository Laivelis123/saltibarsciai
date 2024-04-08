const express = require('express');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const { Group } = require('../models'); // Assuming you have imported Group model
const shortid = require('shortid');
const router = require('../routes/group');
const app = express();
app.use(express.json());
app.use('/', router); 
//token_patikrinimui:

//sukuriama grupe su prisijungimo kodu:
describe('post /create', () => {
    it('sukurta nauja grupe: ', async () => {
        const req = {name: 'testing'};
        Group.create = jest.fn().mockResolvedValue({

            id: 'mockGroupId',
            name: req.name,
            code: 'mockCode',
            userId: 'mockUserId'
        });
        const response = await supertest(app)
      .post('/create')
      //.set('Authorization', `Bearer ${mockToken}`)
      .send(req);
      expect(response.statusCode).toBe(201);

    });
    it('error handling', async () => {
        const response = await supertest(app)
        .post('/create')
        //.set('Authorization', `Bearer ${mockToken}`)
        .send({ name: 'testing' });

        expect(response.statusCode).toBe(500);


    });


});

