/**
 * Allows for and/or props
 *
 * Example:
 *
 *    interface MenuItem {  title: string;
 *      component?: number;
 *      click?: number;
 *      icon: string;
 *    }
 *    type ClickAndOrComponent = RequireAtLeastOne<MenuItem, 'click' | 'component'>
 *
 * Ref: https://stackoverflow.com/a/49725198/1202757
 **/
declare type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
}[Keys]
