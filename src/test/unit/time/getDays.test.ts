import request from 'supertest';

describe('Jobs -> Test', function () {
  it('Get jobs', async function () {
    const response = await request('http://localhost:5000').get('/users');
    expect(response.status).toBe(200);
  });
});
