/**
 * Import this file to filter the console logs.
 *
 * Alternatively, we could have used react-native.YellowBox. See Ignite boilerplate for example.
 */
const originalWarn = console.warn;
console.warn = function warn(...args) {
    if (args.length > 0 && typeof args[0] === 'string' && (
            /^Require cycle: /.test(args[0])
    )) {
        return;
    }
    originalWarn.apply(console, args);
};
const originalError = console.error;
console.error = function error(...args) {
    // if (args.length > 0 &&
    //     typeof args[0] === 'string' && (
    //         /^Warning: .* has been extracted/.test(args[0])
    //     )) {
    //     return;
    // }
    originalError.apply(console, args);
};
