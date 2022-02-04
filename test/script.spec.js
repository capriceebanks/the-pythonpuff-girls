/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const script = require('../client/script');


describe('script.js', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = script.toString();
    });

    describe('posts load on start', () => {
        it('fetches posts from api', () => {
            expect(script.addAllGifPlusComments).toHaveBeenCalledWith(data);
        });
    })

})
