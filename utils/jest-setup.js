/**
 * Sets up jest and enzyme for react native
 *
 * Refs: https://airbnb.io/enzyme/docs/guides/react-native.html
 */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
    Object.defineProperties(target, {
        ...Object.getOwnPropertyDescriptors(src),
        ...Object.getOwnPropertyDescriptors(target),
    });
}

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};
global.requestAnimationFrame = function (callback) {
    return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
    clearTimeout(id);
};
copyProps(window, global);


const originalError = global.console.error;
global.console.error = function error(...args) {
    if (args.length > 0 && typeof args[0] === 'string' && (
        /is using incorrect casing/.test(args[0])
        || /useLayoutEffect does nothing on the server/.test(args[0])
        || /React does not recognize the .* prop on a DOM element/.test(args[0])
        || /Received .* for a non-boolean attribute/.test(args[0])
    )) {
        return;
    }
    originalError.apply(console, args);
};