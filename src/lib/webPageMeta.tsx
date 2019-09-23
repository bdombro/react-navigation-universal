/**
 * Convenience Functions for dealing with primitive operations like comparisons,
 * searches, shortening, sleeping, etc.
 */

import {AppDescription, AppName} from "../config/App.config";
import {Platform} from "react-native";

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
