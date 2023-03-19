/**
 * @jest-environment jsdom
*/

const { exportAllDeclaration } = require("@babel/types");

describe('picture-in-picture mode', () => {
    test('add picture-in-picture element', () => {
        const button = document.createElement('button');
        document.body.appendChild(button);
        const event = new Event('click');
        button.dispatchEvent(event);
        const video = document.createElement('video');
        document.body.appendChild(video);
        expect(document.getElementsByTagName('video')).toHaveLength(1);
    });
})