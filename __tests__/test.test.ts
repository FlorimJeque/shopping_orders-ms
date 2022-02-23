/* eslint-disable no-undef */
import supertest from 'supertest';
/* import faker from 'faker'; */

import app from '../src/app';

const api = supertest(app);
describe('Check express', () => {
  it('Express rocks', async () => {
    const response = await api.get('/').send();
    expect(response.status).toEqual(200);
  });
});
