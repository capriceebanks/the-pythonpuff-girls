/**
 * @jest-environment jsdom
 */


 const request = require('supertest');
 const app = require('../server/app');
 const Post = require('../server/post.js')

 describe('post', () => {

    it("addPost function returns Post.all", (done) => {
        expect(Post.addPost()).toHaveReturnedWith(Post.all);
    });

 })
