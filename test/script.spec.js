/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const script = fs.readFileSync(path.resolve(__dirname, '../client/script.js'), 'utf8');

describe('script.js', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = script.toString();
    });

    describe('posts load on start', () => {
        it('fetches posts from api', () => {
            expect(addAllGifPlusComments).toHaveBeenCalledWith(data);
        });
    })

})
