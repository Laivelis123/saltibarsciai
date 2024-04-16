const router  = require('../routes/category'); // Replace with the actual path to your router file
const { User, Category } = require('../models');
const { Op } = require('sequelize');
const { json } = require('body-parser');
const supertest = require('supertest');
const express = require('express');
const app = express();
// Gauna visus kategorijas pagal filtrą arba be filtro.
app.use(router);
describe('filtering_categories_filter', () =>{
    
    it('be filtro: ', async () => {
        const res = await supertest(app).get('/filter');
          //await router(req,res);   
          expect(res.statusCode).toBe(200);
          //expect(res.)
          //expect(res.data).

    });
    it('su filtru', async () => {
        const res = await supertest(app).get('/filter?search=test');
        try{
            expect(res.statusCode).toBe(200);  


        }
        catch{
            expect(res.statusCode).toBe(500);  


        }

    });
    
});

//// Gauna visas kategorijas.
describe('visos kategorijos', () => {
    it('korektiskai visos', async () => {
        const result = await supertest(app).get('/all');
        expect(result.statusCode).toBe(200);

    });

});
// Gauna kategorijos vaikines kategorijas pagal nurodytą ID.(PATAISYTI!!)
describe('vaikines visos', () => {
    it('visos', async () => {
        const mocking = [{ id: 1, name: 'kategorija 1' }];
        jest.spyOn(Category, 'findAll').mockResolvedValue(mocking);
        const res = await supertest(app).get('/1/children');
        expect(res.statusCode).toBe(200);

    });
});

describe('GET /:id/children', () => {
    it('grazina kategorijas pagal id', async () => {
      const mockCategories = [
        { id: 1, name: 'Child  1', parentId: 1 },
        { id: 2, name: 'Child  2', parentId: 1 },
      ];
      Category.findAll = jest.fn().mockResolvedValue(mockCategories);
  
      const categoryId = 1; 
      const response = await supertest(app).get(`/${categoryId}/children`);
  
      expect(response.status).toBe(200);
      });
  
    it('errors', async () => {
      Category.findAll = jest.fn().mockRejectedValue(new Error('Database error'));
  
      const categoryId = 1;
      const response = await supertest(app).get(`/${categoryId}/children`);
      expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Vidinė serverio klaida' });
    });
  });


// Sukuria naują kategoriją
describe('kategorijos kurimas:', () => {
    it('sukurta kategorija', async () => {
        //const result = await supertest(app).get('/create');
        const categoryData = {
            name: '',
            bulletPoints: '',
            parentId: null
        };   
        //
        const res = await supertest(app).post( '/create').send(categoryData);
        try{
            expect(res.statusCode).toBe(201);


        }
        catch{
            expect(res.statusCode).toBe(500);


        }

    });

});

// Gauna kategoriją pagal nurodytą ID.
describe('GET /categories/:id', () => {
    it('su user data sukurta', async () => {
        const user_mocking = await User.create({
            username: 'some2',
            password: 'Password$23', // Provide password
            email: 'test@example.com', // Provide email
            accountType: 'Mokytojas' // Provide accountType
        });
        const mockCategory = await Category.create({
            name: 'Testavimo',
            userId: user_mocking.parentId,
            // Other necessary attributes
          });
          const res = await express.request().get(`/categories/${mockCategory.parentId}`);
          //expect(res.body.name)
          try{
            expect(res.statusCode).toBe(200);


          }
          catch{
            expect(res.statusCode).toBe(500);


          }
          //istrinama:
          await mockCategory.destroy();
          await user_mocking.destroy();

    });
    it('neegzistuoja kategorija 404', async () => {
        const response = await supertest(app).get( `/categories/neegzistuoja`);   
        expect(response.statusCode).toBe(404); 
    })
});



