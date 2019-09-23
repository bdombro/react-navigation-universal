/**
 * Allows for either-or props
 *
 * Example:
 *
 *    interface MenuItem {  title: string;
 *      component?: number;
 *      click?: number;
 *      icon: string;
 *    }
 *    type ClickOrComponent = RequireOnlyOne<MenuItem, 'click' | 'component'>
 *
 * Ref: https://stackoverflow.com/a/49725198/1202757
 **/
declare type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
    [K in Keys]-?:
    Required<Pick<T, K>>
    & Partial<Record<Exclude<Keys, K>, undefined>>
}[Keys]
