// JavaScript source code
const auth = require('../routes/auth');

test('login is aaaa', async () => {
    const data = await global.fetch();
    expect(data).toBe('aaaa');
});