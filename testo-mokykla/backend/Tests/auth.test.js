const axios = require('axios');
const { fetchData } = './';
const jwt = require("jsonwebtoken");
const { waitFor } = require('@testing-library/jest-dom');

describe('/register', () => {
    it('Gives message: Vidinë severio klaida', async () => {
        const url = 'http://localhost:3001/api/auth/register';
        try { const data = await axios.post(url); }
        catch (e) {await expect(e.response.status.toString()).toMatch('500'); }
    });
    it('Gives message: Vartotojas arba el. paðtas jau egzistuoja', async () => {
        const url = 'http://localhost:3001/api/auth/register';
        const user = { username: "aaa", email: "aaa@aaa.aaa", password: "aaaa", accountType: "student" };
        try { const data = await axios.post(url, user); }
        catch (e) { await expect(e.response.status.toString()).toMatch('400'); }
    });
    it('Gives message: Vartotojas sëkmingai uþregistruotas', async () => {
        const url = 'http://localhost:3001/api/auth/register';
        const user = { username: "fff", email: "fff@fffff.ffff", password: "aaaa", accountType: "student" };
        try { const data = await axios.post(url, user); }
        catch (e) { await expect(e.response.status.toString()).toMatch('201'); }
    })
})
describe('/login', () => {
    it('Gives message: Vidinë severio klaida', async () => {
        const url = 'http://localhost:3001/api/auth/login';
        try { const data = await axios.post(url); }
        catch (e) { await expect(e.response.status.toString()).toMatch('500'); }
    });
    it('Gives message: Neteisingas vartotojo vardas arba slaptaþodis.', async () => {
        const url = 'http://localhost:3001/api/auth/login';
        const user = { username: "aaa", password: "bbbb"};
        try { const data = await axios.post(url, user); }
        catch (e) { await expect(e.response.status.toString()).toMatch('401'); }
    })
})
describe('/logout', () => {
    it('Gives message: Vidinë severio klaida', async () => {
        const url = 'http://localhost:3001/api/auth/logout';
        try { const data = await axios.post(url); }
        catch (e) { await expect(e.response.status.toString()).toMatch('500'); }
    });
    it('Gives 204', async () => {
        const url = 'http://localhost:3001/api/auth/logout';
        const user = { username: "aaa", email: "aaa@aaa.aaa", password: "aaaa", accountType: "student" };
        const data = await axios.post(url, user); await expect(data.status.toString()).toMatch('204');
    });
})
describe('/refresh', () => {
    it('Gives 401 error', async () => {
        const url = 'http://localhost:3001/api/auth/refresh';
        try { const data = await axios.post(url); }
        catch (e) { await expect(e.response.status.toString()).toMatch('401'); }
    });
    it('Gives 200', async () => {
        const url = 'http://localhost:3001/api/auth/refresh';
        const user = { refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJhYWEiLCJpYXQiOjE3MTMwMTk2NzV9.M7RWZse14h2Q_8fjddaPLpzl3gE7peYDeJlHsU1qs3A' };
        const data = await axios.post(url, user);
        await expect(data.status.toString()).toMatch('200');
    });
    it('Gives 500 error', async () => {
        const url = 'http://localhost:3001/api/auth/refresh';
        const user = { refreshToken: '.eyJpZCI6NCwidXNlcm5hbWUiOiJhYWEiLCJpYXQiOjE3MTMwMTk2NzV9.M7RWZse14h2Q_8fjddaPLpzl3gE7peYDeJlHsU1qs3A' };
        try { const data = await axios.post(url, user); }
        catch (e) { await expect(e.response.status.toString()).toMatch('500'); }
    });
})
describe('/user', () => {
    it('Gives 404 error', async () => {
        const url = 'http://localhost:3001/api/auth/user';
        const user = { username: "abaa", password: "bbbb" };
        try { const data = await axios.post(url, user); }
        catch (e) { await expect(e.response.status.toString()).toMatch('404'); }
    });
    //it('Gives 404 error', async () => {
    //    const url = 'http://localhost:3001/api/auth/user';
    //    const user = { username: "aaa", password: "aaaa" };
    //    try { const data = await axios.post(url, user); }
    //    catch(e) { console.log(e); }

    //    //await expect(data.status.toString()).toMatch('200');
    //});
})