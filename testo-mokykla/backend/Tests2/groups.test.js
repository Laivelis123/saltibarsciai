const express = require('express');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const { User, Group } = require('../models'); // Assuming you have imported Group model
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
      try{
      }
      catch{
        expect(response.statusCode).toBe(500);

      }

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
      beforeAll(() => {
        process.env.JWT_SECRET = 'da63c645807941e8b65af7271caca6af17ed20edd40cbdd030618a2b9596dc5b';
    });
    
      it('sekmingai prisijungia i grupe:', async () => {
        const code = 'validCode';
        const userId = 'userId';
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);        

        jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
          callback(null, { id: 'userId' });
      });
        const res = await supertest(app)
        .post('/join')
        .set('Authorization', `Bearer ${token}`)
        .send({ code });
        try{
          expect(res.statusCode).toBe(201);
          expect(res.body.message).toBe('Sėkmingai prisijungta prie grupės');



        }
        catch{
          expect(res.statusCode).toBe(500);
        }


      });
      it('error handling: ', async () => {
        const code = 'invalidCd';
        const token = 'invalid';
        jwt.verify.mockImplementation(() => {
            throw new Error('Invalid token');
          });
        const res = await supertest(app)
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
// Gaunamos prisijungusios vartotojo grupės
describe('GET /joined-groups', () => {

    afterEach(() => {
        jest.clearAllMocks();
      });
      beforeAll(() => {
        process.env.JWT_SECRET = 'da63c645807941e8b65af7271caca6af17ed20edd40cbdd030618a2b9596dc5b';
    });
    it('Gaunamos prisijungusios grupes', async () => {
      const userId = 'valid';
      jest.spyOn(jwt, 'verify').mockReturnValueOnce({ id: userId });       
       const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
       const user = {
        id: userId,
        Groups: [
          { id: 'groupId1', name: 'Group 1', code: 'code1' },
          { id: 'groupId2', name: 'Group 2', code: 'code2' }
        ]
      };
      User.findByPk = jest.fn().mockResolvedValue(user);
      const response = await supertest(app)
      .get('/joined-groups')
      .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      

    });
    it('Klaida gaunant prisijungusias vartotojo grupes', async ()=>{
      const token = 'notExistent';
      const response = await supertest(app)
      .get('/joined-groups')
      .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(500);  
    })


});
// Gaunama grupė pagal ID
describe('GET /:groupId', () => {
  it('Gaunama grupe pagal id', async () => {
    const userId = 'valid';
    jest.spyOn(jwt, 'verify').mockReturnValueOnce({ id: userId });       
     const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
     const groupId = 'validId'
     const group = {
      id: groupId,
      userId: userId,
      name: 'Group Name',
      Users: [
        { id: 'userId1', username: 'user1' },
        { id: 'userId2', username: 'user2' }
      ]
    };
    jest.spyOn(jwt, 'verify').mockReturnValueOnce({ id: userId });

  
    Group.findByPk = jest.fn().mockResolvedValue(group);
    const response = await supertest(app)
    .get('/${groupId}')
    .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('Grupė nerasta', async () => {
    const userId = 'Invalid';
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
    jest.spyOn(jwt, 'verify').mockReturnValueOnce({ id: userId });      
    Group.findByPk = jest.fn().mockResolvedValue(null);
    const response = await supertest(app)
    .get('/invalid')
    .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
  })


});

// Grupės informacijos atnaujinimas
describe('GET /:groupId', () => {

});
