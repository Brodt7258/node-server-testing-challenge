const request = require('supertest');
const app = require('./app');

describe('test get on root path', () => {
  test('receive 200 code', () => {
    return request(app).get('/').then(response => {
      expect(response.statusCode).toBe(200);
    });
  });

  test('response contains 3 items', () => {
    return request(app).get('/').then(response => {
      expect(response.body.length).toBe(3);
    });
  });
});

describe('test post on root path', () => {
  test('receive 201 code', () => {
    const data = {
      item: 'test',
      quantity: 2
    };
    return request(app).post('/').send(data)
      .then(response => {
        expect(response.statusCode).toBe(201);
      });
  });
  test('receive 201 code', () => {
    const data = {
      item: 'test',
      quantity: 2
    };
    return request(app).post('/').send(data)
      .then(response => {
        const { id, item, quantity } = response.body;
        expect(id).toBe(4);
        expect(item).toBe('test');
        expect(quantity).toBe(2);
      });
  });
});

describe('test delete', () => {
  test('receive 204 code', () => {
    const id = 2;
    return request(app).delete(`/${id}`)
      .then(response => {
        expect(response.statusCode).toBe(204);
      });
  });
  test('previous delete removed a post', () => {
    return request(app).get('/')
      .then(response => {
        expect(response.body.length).toBe(4);
      });
  });
  test('previous delete removed the correct post', () => {
    return request(app).get('/')
      .then(response => {
        expect(response.body).not.toEqual((
          expect.arrayContaining([
            expect.objectContaining({
              id: 2
            })
          ])
        ));
      });
  });
});