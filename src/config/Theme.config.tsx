import { DefaultTheme } from 'react-native-paper';

const primaryHue = 219;

export const ThemeConfig = {
    ...DefaultTheme,
    dark: false,
    // roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: `hsl(${primaryHue},93%,40%)`,
        primaryLight: `hsl(${primaryHue},23%,60%)`,
        primaryLighter: `hsl(${primaryHue},23%,84%)`,
        primaryLightest: `hsl(${primaryHue},23%,90%)`,
        primaryDark: `hsl(${primaryHue},93%,14%)`,
        primaryDarker: `hsl(${primaryHue},93%,8%)`,
        // accent: '#f1c40f',
    }
};
