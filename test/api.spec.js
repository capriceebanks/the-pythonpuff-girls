const request = require('supertest');
const app = require('../server/app');

describe('api', () => {

    it("GET / responds with string 'Hello World!'", (done) => {
        request(app)
        .get('/')
        .expect(200, done);
    });

    describe('/posts', () => {
        let testData = [
            {
                "id": 1,
                "message": "Made a new API!",
                "emojis": {"heart":4, "celebrate": 3, "laugh": 1},
                "comments": ["Wow good job!!!", "Nice!", "What does your API do??"],
                "gifUrl": "https://media4.giphy.com/media/3o6UB3VhArvomJHtdK/giphy.gif?cid=a2b4cd36k1mdj1exmue34ziic08ykmew8x5edmxjg2nf1xbn&rid=giphy.gif&ct=g"
            }
        ];

        it('GET /posts responds with status code 400', (done) => {
            request(app)
            .get('/posts')
            .expect(400, done);
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
            .expect(testData[0].comments, done);
        });

    });

    describe('/gifs', () => {
        it('GET /gifs/heart responds with correct result', () => {
            request(app)
            .get('/gifs/heart')
            .expect('Content-Type', /json/, done);
        });
    })

});
