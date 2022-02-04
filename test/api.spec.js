const request = require('supertest');
const app = require('../server/app');
jest.setTimeout(50000)
global.fetch = require('jest-fetch-mock');

describe('app', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })
    afterEach(() => {
        fetch.resetMocks();
    })
    describe('submitaddGifPlusCommentsComment', () => {
        test('it makes a post request to /posts/comments/new with the comment data', () => {
            const fakeSubmitEvent = {
                preventDefault: jest.fn(),
                target: {
                    name: { value: 'Bob' },
                    age: { value: 4 }
                }
            }
            app.addGifPlusComments(fakeSubmitEvent);
            expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
            expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({ name: "Bob", age: 4 }));
        })
    })
    describe('appendCat', () => {
        test('it renders a new li on the page with the cat data', () => {
            const liCount = document.querySelectorAll('li').length;
            app.appendCat({ name: 'Testy', age: 42 });
            const newLiCount = document.querySelectorAll('li').length;
            expect(newLiCount).toEqual(liCount + 1)
            expect(document.querySelector('section#cats').textContent).toContain("Testy");
            expect(document.querySelector('section#cats').textContent).toContain(42);
        })
    })
})

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
