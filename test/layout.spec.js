/**
 * @jest-environment jsdom
 */

 const fs = require('fs');
 const path = require('path');
 const html = fs.readFileSync(path.resolve(__dirname, '../client/index.html'), 'utf8');

 describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    describe('head', () => {
        it('has favicon', () => {
            let favicon = document.querySelector("head link[rel='shortcut icon']");
            expect(favicon).toBeTruthy();
        });

        it('has stylesheet', () => {
            let stylesheet = document.querySelector("head link[rel='stylesheet']");
            expect(stylesheet).toBeTruthy();
        });

        it('has script', () => {
            let script = document.querySelector("head script[rel='script']");
            expect(script).toBeTruthy();
        });

    });

    describe('body', () => {

        it('has navigation bar', () => {
            let navBar = document.querySelector("body nav");
            expect(navBar).toBeTruthy();
        });

        it('has logo', () => {
            let logo = document.querySelector("body nav img");
            expect(logo).toBeTruthy();
        });

        it('has search bar', () => {
            let searchBar = document.querySelector("body nav input");
            expect(searchBar).toBeTruthy();
        });

        describe('main', () => {
            it('has form', () => {
                let form = document.querySelector("body main section[id='form']");
                expect(form).toBeTruthy();
            });

            it("has an add gif button with text 'Add Gif'", () => {
                let addGifBtn = document.querySelector("body main button[id='addGif']");
                expect(addGifBtn).toBeTruthy();
                expect(addGifBtn.textContent).toBe('Add Gif');
            });

            it("has an add post button with text 'Add Post'", () => {
                let addPostBtn = document.querySelector("body main section[id='form'] button[id='formSubmit']");
                expect(addPostBtn).toBeTruthy();
                expect(addPostBtn.textContent).toBe('Add Post');
            });

            it('has footer', () => {
                let footer = document.querySelector("body footer");
                expect(footer).toBeTruthy();
            });
        });
    });

 })
