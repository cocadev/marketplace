import { colors } from '../../theme/variables';
import { NavigatorStyle } from "react-native-navigation";

const BASE = {
    navBarTextColor: colors.white,
    navBarButtonColor: colors.white,
    statusBarColor: colors.primaryDark,
    navBarBackgroundColor: colors.primary,
}
export const ScreenConfig = {
    BASE,
    NAV_HIDDEN: {
        ...BASE,
        tabBarHidden: true,
        navBarHidden: true
    },
    TAB_HIDDEN: {
        ...BASE,
        tabBarHidden: true,
    },
    TRANSPARENT_NAV: {
        navBarTextColor: colors.white,
        navBarButtonColor: colors.white,
        statusBarColor: colors.primaryDark,
        drawUnderNavBar: true,
        navBarTransparent: true,
        navBarBackgroundColor: 'transparent',
        navBarNoBorder: true,
        tabBarHidden: true,
        navBarHidden: true
    },
    TRANSPARENT_NAVBAR: <NavigatorStyle>{
        navBarTextColor: colors.blue,
        navBarButtonColor: colors.grey,
        statusBarColor: colors.primaryDark,
        drawUnderNavBar: true,
        navBarTransparent: false,
        navBarBackgroundColor: colors.white,
        navBarNoBorder: false,
        topBarElevationShadowEnabled: true,
        tabBarHidden: true,
        // navBarHidden: true
    }
}