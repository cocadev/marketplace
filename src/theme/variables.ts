import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export const images = {
    greenLogo: require('../assets/images/green-logo.png'),
    landing: require('../assets/images/landing.png'),
    whiteLogo: require('../assets/images/white-logo.png'),
};

export const colors = {
    primary: '#00DBAC',
    primaryDark: '#00bb8a',
    primaryLight: '#47989d',
    greyDark: '#58595E',
    bgGrey: '#f5f5f5',
    bgWhite: '#f9f9f9',
    grey: '#AAAAAA',
    black: 'rgba(0,0,0,1)',
    blue: '#104a7b',
    white: '#ffffff',
    transparent: 'transparent',
    red: '#780505',
    green: '#34A212',
};

export const opacities = {
    primary: 0.87,
    secondary: 0.54,
};

export const fontSizes = {
    xl: 20,
    l: 16,
    m: 14,
    s: 12,
    xs: 10,
};

export const theme = StyleSheet.create({
    greyBg: {backgroundColor: colors.bgWhite},
    container: {
        padding: moderateScale(10),
        margin: 10
    },
    infoTitle: {
        width: '99%',
        textAlign: 'center',
        margin: 10,
        marginBottom: 0,
        color: colors.greyDark,
        padding: 10,
        alignSelf: 'center'
    },
    button: {alignSelf: 'center', margin: moderateScale(10), width: '90%'},
    center: {alignSelf: 'center'},
    end: {alignSelf: 'flex-end'},
    p1: {padding: 10},
    p2: {padding: 20},
    p3: {padding: 30},
    p4: {padding: 40},
    pT1: {paddingTop: 10},
    pT2: {paddingTop: 20},
    pT3: {paddingTop: 30},
    pT4: {paddingTop: 40},
    pB1: {paddingBottom: 10},
    pB2: {paddingBottom: 20},
    pB3: {paddingBottom: 30},
    pB4: {paddingBottom: 40},
    m1: {margin: 10},
    m2: {margin: 20},
    m3: {margin: 30},
    m4: {margin: 40},
    mR1: {marginRight: 10},
    mT1: {marginTop: 10},
    mT2: {marginTop: 20},
    mT3: {marginTop: 30},
    mT4: {marginTop: 40},
    mB1: {marginBottom: 10},
    mB2: {marginBottom: 20},
    mB3: {marginBottom: 30},
    mB4: {marginBottom: 40},
});

export const pickerStyle = {
    mB1: StyleSheet.create({
        inputIOS: theme.mB1,
        inputAndroid: theme.mB1,
    })
};