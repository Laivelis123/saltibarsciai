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
    afterEach(() => {
        jest.clearAllMocks();
      });
      
      
    it('sukurta nauja grupe: ', async () => {
        const req = {name: 'testing'};
        Group.create = jest.fn().mockResolvedValue({

            id: 'mockGroupId',
            name: req.name,
            //code: 'mockCode',
            //userId: 'mockUserId'
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

// Vartotojas prisijungia prie grupės
describe('POST /join', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });
      it('sekmingai prisijungia i grupe:', async () => {
        const code = 'validCode';
        const token = 'validToken';
        const userId = 'userId';
        jwt.verify.mockResolvedValueOnce({})
        const res = await request(app)
        .post('/join')
        .set('Authorization', `Bearer ${token}`)
        .send({ code });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Sėkmingai prisijungta prie grupės');

      });
      it('error handling: ', async () => {
        const code = 'invalidCd';
        const token = 'invalid';
        jwt.verify.mockImplementation(() => {
            throw new Error('Invalid token');
          });
        const res = await request(app)
        .post('/join')
        .set('Authorization', `Bearer ${token}`)
        .send({ code });
        expect(res.statusCode).toBe(500);
        expect(res.body.error).toBe('Vidinė serverio klaida');

      });
    
});
// Gaunami vartotojo grupės
describe('GET /my-groups', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });
      beforeAll(() => {
        process.env.JWT_SECRET = 'da63c645807941e8b65af7271caca6af17ed20edd40cbdd030618a2b9596dc5b';
    });
    it('valid token extracted all groups', async () => {
        const userId = 'userId';
        jest.spyOn(jwt, 'verify').mockReturnValueOnce({ id: userId });       
         const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
        const response = await supertest(app)
        .get('/my-groups')
        .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('500 if errors', async () => {
        jest.spyOn(jwt, 'verify').mockImplementation(() => {
            throw new Error('Invalid token');
        });
        const response = await supertest(app)
        .get('/my-groups');
        expect(response.status).toBe(500);
    });
  
});


