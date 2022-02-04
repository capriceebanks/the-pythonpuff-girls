const request = require('supertest');
const app = require('../server/app');
jest.setTimeout(50000)

describe('api', () => {

    it("GET / responds with string 'Hello World!'", (done) => {
        request(app)
        .get('/')
        .expect(200, done);
    });

    describe('/posts', () => {
        let testData = [
            "Made a new API!",
            {"heart":4, "celebrate": 3, "laugh": 1},
            ["Wow good job!!!", "Nice!", "What does your API do??"],
            "https://media4.giphy.com/media/3o6UB3VhArvomJHtdK/giphy.gif?cid=a2b4cd36k1mdj1exmue34ziic08ykmew8x5edmxjg2nf1xbn&rid=giphy.gif&ct=g"
        ];

        it('GET /posts responds with status code 200', (done) => {
            request(app)
            .get('/posts')
            .expect(200, done);
        });

        it('GET /posts/:id responds with json', (done) => {
            request(app)
            .get('/posts/1')
            .expect('Content-Type', /json/, done);
        });

        it('GET /posts/1 responds with correct result', (done) => {
            request(app)
            .get('/posts/1')
            .expect(testData, done);
        });

        it('GET /posts/comments/1 responds with correct result', (done) => {
            request(app)
            .get('/posts/comments/1')
            .expect(testData[2], done);
        });

    });

    describe('/gifs', () => {
        
        it('GET /gifs/heart responds with correct result', (done) => {
            request(app)
            .get('/gifs/heart')
            .expect('Content-Type', /json/, done);
        });
    })

});
