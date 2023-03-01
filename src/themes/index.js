import { createTheme } from '@mui/material/styles';

// assets
import themeStyle from 'assets/scss/_theme.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';
import customShadows from './shadows';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
    const color = themeStyle;

    const themeOption = {
        colors: color,
        heading: '',
        paper: '',
        backgroundDefault: '',
        background: '',
        darkTextPrimary: '',
        darkTextSecondary: '',
        textDark: '',
        menuSelected: '',
        menuSelectedBack: '',
        divider: '',
        customization
    };

    switch (customization.navType) {
        case 'dark':
            themeOption.paper = color.darkLevel2;
            themeOption.backgroundDefault = color.darkPaper;
            themeOption.background = color.darkBackground;
            themeOption.darkTextPrimary = color.darkTextPrimary;
            themeOption.darkTextSecondary = color.darkTextSecondary;
            themeOption.textDark = color.darkTextPrimary;
            themeOption.menuSelected = color.darkSecondaryMain;
            themeOption.menuSelectedBack = color.darkSecondaryMain + 15;
            themeOption.divider = color.darkTextPrimary;
            themeOption.heading = color.darkTextTitle;
            break;
        case 'light':
        default:
            themeOption.paper = color.paper;
            themeOption.backgroundDefault = color.paper;
            themeOption.background = color.primaryLight;
            themeOption.darkTextPrimary = color.grey300;
            themeOption.darkTextSecondary = color.grey500;
            themeOption.textDark = color.grey900;
            themeOption.menuSelected = color.secondaryDark;
            themeOption.menuSelectedBack = color.secondaryLight;
            themeOption.divider = color.grey200;
            themeOption.heading = color.grey900;
            break;
    }

    const themeOptions = {
        direction: customization.rtlLayout ? 'rtl' : 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography(themeOption),
        customShadows: customShadows(customization.navType, themeOption)
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default theme;
