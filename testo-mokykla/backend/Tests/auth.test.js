const request = require('supertest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { User, Session } = require("../models");

jest.mock('../models', () => {
    const { User, Session } = require('sequelize');
    return {
        User: {
            findOne: jest.fn(),
            create: jest.fn(),
        },
        Session: {
            findOne: jest.fn(),
            create: jest.fn(),
        },
    };
});

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
    compare: jest.fn(),
    hash: jest.fn(),
}));

describe('Authentication routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /register', () => {
        it('should register a new user', async () => {
            const newUser = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                accountType: 'regular',
            };

            User.findOne.mockResolvedValue(null);
            bcrypt.hash.mockResolvedValue('hashedPassword');
            User.create.mockResolvedValue(newUser);

            const response = await request(express())
                .post('/register')
                .send(newUser)
                .expect(201);

            expect(User.findOne).toHaveBeenCalledTimes(1);
            expect(bcrypt.hash).toHaveBeenCalledTimes(1);
            expect(User.create).toHaveBeenCalledTimes(1);
            expect(response.body).toMatchObject({ message: 'Vartotojas sëkmingai uþregistruotas' });
        });

        it('should return 400 if user already exists', async () => {
            const existingUser = {
                username: 'existinguser',
                email: 'existing@example.com',
                password: 'password123',
                accountType: 'regular',
            };

            User.findOne.mockResolvedValue(existingUser);

            const response = await request(express())
                .post('/register')
                .send(existingUser)
                .expect(400);

            expect(response.body).toMatchObject({ error: 'Vartotojas arba el. paðtas jau egzistuoja' });
        });
    });

    describe('POST /login', () => {
        it('should login a user', async () => {
            const user = {
                id: 1,
                username: 'testuser',
                password: 'hashedPassword',
            };

            const session = {
                userId: 1,
                ipAddress: '127.0.0.1',
                expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
            };

            User.findOne.mockResolvedValue(user);
            bcrypt.compare.mockResolvedValue(true);
            Session.findOne.mockResolvedValue(null);
            Session.create.mockResolvedValue(session);
            jwt.sign.mockReturnValue('mockToken');

            const response = await request(express())
                .post('/login')
                .send({ username: user.username, password: 'password123' })
                .expect(200);

            expect(User.findOne).toHaveBeenCalledTimes(1);
            expect(bcrypt.compare).toHaveBeenCalledTimes(1);
            expect(Session.findOne).toHaveBeenCalledTimes(1);
            expect(Session.create).toHaveBeenCalledTimes(1);
            expect(jwt.sign).toHaveBeenCalledTimes(1);
            expect(response.body).toHaveProperty('token', 'mockToken');
        });

        it('should return 401 for invalid credentials', async () => {
            User.findOne.mockResolvedValue(null);

            const response = await request(express())
                .post('/login')
                .send({ username: 'nonexistentuser', password: 'invalidPassword' })
                .expect(401);

            expect(response.body).toMatchObject({ error: 'Neteisingas vartotojo vardas arba slaptaþodis.' });
        });
    });
});