//const express = require('express');
//const request = require('supertest');
//const jwt = require('jsonwebtoken');
//const router = express.Router();
//const { User } = require('../models');

//jest.mock('jsonwebtoken');
//jest.mock('../models');

//const app = express();
//app.use('/user', router);

//describe('GET /user', () => {
//    test('should return user data when valid token is provided', async () => {
//        const userMock = { id: 1, username: 'test', email: 'test@gmail.com', accountType: 'student' };
//        const token = 'valid_token';
//        jwt.verify.mockReturnValueOnce({ username: userMock.username });
//        User.findOne.mockResolvedValueOnce(userMock);

//        const response = await request(app)
//            .get('/user')
//            .set('Authorization', `Bearer ${token}`);

//        expect(response.status).toBe(200);
//        expect(response.body).toEqual(expect.objectContaining({
//            id: userMock.id,
//            username: userMock.username,
//            email: userMock.email,
//            accountType: userMock.accountType,
//        }));
//    });
//})
const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const router = express.Router(); // Import your router file here

jest.mock("../models", () => ({
    User: {
        findOne: jest.fn(),
    },
}));

const app = express();
app.use(express.json());
app.use("/", router);

describe("GET /user endpoint", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return user data when valid token is provided", async () => {
        const mockUser = {
            id: 2,
            username: "testa",
            email: "testa@gmail.com",
            accountType: "student",
        };

        const us = User.findOne.mockResolvedValue(mockUser);
        console.log('user', us);
        const token = jwt.sign({ username: "testUser" }, 'da63c645807941e8b65af7271caca6af17ed20edd40cbdd030618a2b9596dc5b');
        const response = await request(app)
            .get("/user")
            .set("Authorization", `Bearer ${token}`);

        console.log('Response:', response.body); // Log response body for debugging
        console.log('Response Status:', response.status); // Log response status for debugging

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: mockUser.id,
            username: mockUser.username,
            email: mockUser.email,
            accountType: mockUser.accountType,
        });
    });

    //it("should return 404 if user is not found", async () => {
    //    User.findOne.mockResolvedValue(null);

    //    const token = jwt.sign({ username: "nonExistingUser" }, process.env.JWT_SECRET);
    //    const response = await request(app)
    //        .get("/user")
    //        .set("Authorization", `Bearer ${token}`);

    //    expect(response.status).toBe(404);
    //    expect(response.body).toEqual({ error: "Vartotojas nerastas" });
    //});

    //it("should return 401 if token is expired or invalid", async () => {
    //    const token = "invalidToken";
    //    const response = await request(app)
    //        .get("/user")
    //        .set("Authorization", `Bearer ${token}`);

    //    expect(response.status).toBe(401);
    //    expect(response.body).toEqual({ error: "Sesija pasibaigë arba netinkamas þetonas." });
    //});

    //it("should return 500 if an internal server error occurs", async () => {
    //    User.findOne.mockRejectedValue(new Error("Internal server error"));

    //    const token = jwt.sign({ username: "testUser" }, process.env.JWT_SECRET);
    //    const response = await request(app)
    //        .get("/user")
    //        .set("Authorization", `Bearer ${token}`);

    //    expect(response.status).toBe(500);
    //    expect(response.body).toEqual({ error: "Vidinë serverio klaida" });
    //});
});
