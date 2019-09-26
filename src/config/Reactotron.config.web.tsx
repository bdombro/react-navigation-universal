import Reactotron from 'reactotron-react-js';
import {reactotronRedux} from "reactotron-redux";
import {NodeEnv} from "./App.config";

// in dev, we attach Reactotron, in prod we attach a interface-compatible mock.
if (__DEV__ && NodeEnv !== 'test') {
    // @ts-ignore new console prototype
    console.tron = Reactotron; // attach reactotron to `console.tron`
    const loggerOrig = console.log;
    console.log = (...args) => {
        loggerOrig.apply(console, args);
        Reactotron.log(args);
    };
    const dirLoggerOrig = console.dir;
    console.dir = (...args) => {
        dirLoggerOrig.apply(console, args);
        Reactotron.log(args);
    };
    const warnLoggerOrig = console.warn;
    console.warn = (...args) => {
        warnLoggerOrig.apply(console, args);
        Reactotron.warn(args);
    };
    const debugLoggerOrig = console.debug;
    console.debug = (...args) => {
        debugLoggerOrig.apply(console, args);
        Reactotron.log(args);
    };
    const errorLoggerOrig = console.error;
    console.error = (...args) => {
        errorLoggerOrig.apply(console, args);
        Reactotron.warn(args);
    };

    Reactotron
        .configure() // controls connection & communication settings
        .use(reactotronRedux())
        .connect(); // let's connect!
    // .clear();

} else {
    // attach a mock so if things sneaky by our __DEV__ guards, we won't crash.
    const noop = () => undefined;
    // @ts-ignore new console prototype
    console.tron = {
        benchmark: noop,
        clear: noop,
        close: noop,
        configure: noop,
        connect: noop,
        display: noop,
        error: noop,
        image: noop,
        log: noop,
        logImportant: noop,
        onCustomCommand: noop,
        overlay: noop,
        reportError: noop,
        send: noop,
        startTimer: noop,
        storybookSwitcher: noop,
        use: noop,
        useReactNative: noop,
        warn: noop,
    }
}

export {Reactotron};
