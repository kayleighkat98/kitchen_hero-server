
const app = require('../src/app');
const supertest = require('supertest');

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, boilerplate!');
  });
});

// describe('App', () =>{
//   it('creates a new item for the epantry responding with 201 and the item', function(){
//     return supertest(app)
//       .post('/kitchen/epantry')
//   })
// })