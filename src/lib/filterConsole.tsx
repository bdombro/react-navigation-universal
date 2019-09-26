/**
 * Import this file to filter the console logs.
 *
 * Alternatively, we could have used react-native.YellowBox. See Ignite boilerplate for example.
 */
const originalWarn = console.warn;
console.warn = function warn(...args) {
    if (args.length > 0 && typeof args[0] === 'string' && (
        /^Require cycle: /.test(args[0])
        || /^Warning: componentWillMount has been renamed/.test(args[0])
        || /^Warning: componentWillReceiveProps has been renamed/.test(args[0])
        || /^Animated: `useNativeDriver` is not supported because the native animated module is missing/.test(args[0])
        || /^PanGestureHandler is not yet supported on web/.test(args[0])
        || /^Warning: Async Storage has been extracted from react-native core/.test(args[0])
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
