const request = require('supertest');
const { createApp } = require('../../app');
const app = createApp();
describe('baseline routes', () => {
  it('reports health without external services', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
  it('renders home', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('GeoDiary');
  });
  it('redirects unauthenticated diary requests', async () => {
    expect((await request(app).get('/diaries')).status).toBe(302);
  });
});
