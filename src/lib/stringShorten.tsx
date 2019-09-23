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
