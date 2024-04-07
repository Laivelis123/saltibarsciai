const router  = require('../routes/category'); // Replace with the actual path to your router file
const { Category } = require('../models');
const { Op } = require('sequelize');
const { json } = require('body-parser');
const supertest = require('supertest');
const express = require('express');
const app = express();
// Gauna visus kategorijas pagal filtrą arba be filtro.
app.use(router);


describe('filtering_categories_filter', () =>{
    
    it('su filtru: ', async () => {
        const res = await supertest(app).get('/filter');
        const request = {query:{}};
        const resq = { 
            status: function(code){
                this.code = code;
                return this;    
            },
            json: function(data){
                this.data = data;
            },
          
          };
          //await router(req,res);   
          expect(res.statusCode).toBe(200);
          //expect(res.)
          //expect(res.data).

    });


})
