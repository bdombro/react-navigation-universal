/**
 * Link allows us to easily make elements clickable and nav link
 */
import React from "react";
import {Link as RNLink} from '@react-navigation/web';

export type LinkProps = {
    to: string,
    params?: any,
    onPress?: (event: any) => any,
    preventDefault?: boolean,
};

export function Link({to, params = {}, onPress, preventDefault, ...props}: LinkProps): React.ReactElement {
    if (to === '#') {
        return <a href="javascript:void(0);" onClick={onPress} {...props} />;
    } else if (to.startsWith("http")) {
        return <a href={to} target="_blank" onClick={onPress} {...props} />;
    } else {
        return <RNLink routeName={to} params={params} {...props} onClick={onPress} />;
    }
}
