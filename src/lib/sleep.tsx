/**
 * Return a promise that resolves after ms milliseconds
 *
 * Can be used in async functions to wait for stuff.
 *
 * For example,
 * while(checkIfTrue()) await Sleep(200);
 *
 */
export const sleep = (ms: number) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
};
