import React from "react";
import {Link as RNLink} from '@react-navigation/web';

export const Link = (
    {
        to,
        params = {},
        onPress = () => null,
        ...props
    }: {
        to: string,
        params?: any,
        onPress?: () => any,
        children: any,
    }
) => {
    if (to === '#') {
        return <a href="javascript:void(0);" onClick={onPress} {...props} />;
    } else if (to.startsWith("http")) {
        return <a href={to} target="_blank" onClick={onPress} {...props} />;
    } else {
        return <RNLink routeName={to} params={params} {...props}/>;
    }
};
