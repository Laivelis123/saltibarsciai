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
        expect(res.statusCode).toBe(200);  

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
/*describe('vaikines visos', () => {
    it('visos', async () => {
        const mocking = [{ id: 1, name: 'kategorija 1' }];
        jest.spyOn(Category, 'findAll').mockResolvedValue(mocking);
        const res = await supertest(app).get('/1/children');
        expect(res.statusCode).toBe(200);

    });
});
*/

// Sukuria naują kategoriją, TESTAVIMAS:.
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
        expect(res.statusCode).toBe(201);

    });

});

// Gauna kategoriją pagal nurodytą ID.



