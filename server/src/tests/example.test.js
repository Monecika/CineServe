import {beforeEach, describe, expect, it} from 'vitest';
import request from 'supertest';
import app from '../index.js';
import {Example, sequelize} from '../models/index.js';

describe('/examples', () => {
  beforeEach(async () => {
    // Every test starts from an empty, freshly created in-memory database.
    // force: true also resets the autoincrement counter, so the first row is always id 1 and the tests can rely on that.
    await sequelize.sync({force: true});

    await Example.bulkCreate([
      {value: 'Hello World'},
      {value: 'Second example'}
    ]);
  });

  it('returns all examples', async () => {
    const res = await request(app).get('/examples');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].value).toBe('Hello World');
  });

  it('returns a single example by id', async () => {
    const res = await request(app).get('/examples/1');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({id: 1, value: 'Hello World'});
  });

  it('returns 404 for an unknown id', async () => {
    const res = await request(app).get('/examples/999');

    expect(res.status).toBe(404);
    expect(res.body.message).toContain('not found');
  });

  it('returns 400 for an invalid id', async () => {
    const res = await request(app).get('/examples/abc');

    expect(res.status).toBe(400);
  });
});
