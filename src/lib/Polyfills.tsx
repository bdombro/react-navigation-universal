/**
 * Convenience Functions for dealing with primitive operations like comparisons,
 * searches, shortening, sleeping, etc.
 */

import {AppDescription, AppName} from "../config/App.config";
import {Platform} from "react-native";

/**
 * Return an intersection array of two or multiple arrays
 *
 * Example: ArrayIntersection([1,2], [1]) => [1]
 */
export function arrayIntersection(...arrays) {
    return arrays.reduce((a, b) => b.filter(Set.prototype.has.bind(new Set(a))));
}

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

/**
 * Shorten string by character length with word boundary supported
 *
 * Example:
 * strShorten("We will win if we want", 11) -> "We will win..."
 *
 * Copied from npmjs.com/package/str_shorten and made Typescript friendly
 */
export function stringShorten(
    str: string,
    maxChars: number,
    options?: {
        wordBoundary?: boolean;
        endSymbols?: string;
    }
) {
    if (!str) return str;

    const _optionsDefault = {
        wordBoundary: true,
        endSymbols: '...'
    };
    const charRegx = /\s* \s*|\s*-\s*/;
    const words = str.split(charRegx);
    let retStr = '';

    options = Object.assign(_optionsDefault, options);

    function appendEndSymbols(
        strlen: number,
        maxChars: number,
        endSymbols?: string
    ) /* istanbul ignore next */ {
        return strlen > maxChars ? endSymbols : '';
    }

    if (!maxChars || str.length <= maxChars) {
        return str;
    }

    if (!options.wordBoundary) {
        return str.substring(0, maxChars) + appendEndSymbols(str.length, maxChars, options.endSymbols);
    }

    for (let i = 0; i < words.length; i++) {
        if ((retStr + ' ' + words[i]).length > maxChars) {
            return (
                str.substring(0, retStr.length) +
                appendEndSymbols(str.length, retStr.length, options.endSymbols)
            );
        } else {
            retStr = i === 0 ? words[0] : retStr + (' ' + words[i]);
        }
    }
    return '';
}

/**
 ^                         Start anchor
 (?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
 (?=.*[!@#$&*])            Ensure string has one special case letter.
 (?=.*[0-9].*[0-9])        Ensure string has two digits.
 (?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
 .{8}                      Ensure string is of length 8.
 */
export const isPassword = (subject: string) =>
    new RegExp(
        `^${[
            '(?=.*[A-Z])', // one uppercase
            '(?=.*[a-z])', // one lowercase
            '(?=.*[0-9])', // one number
            '.{8}' // min length
        ].join('')}`
    ).test(subject);


/**
 * setWebPageMeta - helper for setting web page meta
 *
 * Though a little ugly, find and declare page meta elements globally, so that we don't have to re-find them
 * every time we set page meta == performance savings.
 */
let titleElement, descriptionElement;
if (Platform.OS === 'web') {
    titleElement = document && document.querySelector('title');
    descriptionElement = document && document.querySelector('meta[name="description"]');
}
export interface WebPageMeta {
    title: string,
    description: string,
};
export const setWebPageMeta = (
    {
        title = AppName,
        description = AppDescription,
    } : Partial<WebPageMeta>
) => {
    if (Platform.OS !== 'web') return;
    let titleNext = title;
    if (titleNext !== AppName) titleNext = `${AppName} - ${title}`;
    if (titleElement.text !== titleNext)
        titleElement.text = titleNext;

    if (descriptionElement.getAttribute('content') !== description)
        descriptionElement.setAttribute("content", description);
};
