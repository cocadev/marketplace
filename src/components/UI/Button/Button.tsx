import * as React from 'react';
import { SFC } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';
import { colors } from '../../../theme/variables';
import { Touchable } from './Touchable';

type Props = TouchableOpacityProps & {
    isLoading?: boolean;
    onPress?: () => any,
    title?: string;
    style?: StyleProp<ViewStyle>;
    type?: 'link' | 'secondary',
    size?: 'small' | 'medium' | 'large',
    textStyle?: StyleProp<TextStyle>;
}
export const Button: SFC<Props> = (props) => {
    const style: StyleProp<ViewStyle> = [styles.base, props.style];
    const textStyle = [];
    if (props.type) {
        style.push(styles[props.type]);
        textStyle.push(styles[`${props.type}Text`]);
    }

    if (props.size) {
        style.push(styles[props.size]);
        textStyle.push(styles[`${props.size}Text`]);
    }

    return (
        <Touchable style={style} onPress={props.disabled ? null : props.onPress}>
            {props.title ?
             <Text style={[styles.baseText, textStyle, props.textStyle]}>{props.title}</Text> : props.children}
        </Touchable>
    );
};

const styles = StyleSheet.create({
    base: {
        paddingLeft: 15,
        paddingRight: 15,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 50,
        backgroundColor: colors.primary,
        elevation: 2, height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        borderRadius: 25
    },
    baseText: {
        color: colors.blue,
        opacity: 1,
        fontSize: 16,
        fontWeight: '500'
    },
    small: {},
    smallText: {
        fontSize: 13,
    },
    medium: {},
    mediumText: {},
    large: {},
    largeText: {},
    link: {
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: colors.transparent,
        minHeight: undefined,
    },
    linkText: {
        color: colors.primary,
    },
    secondary: {
        backgroundColor: colors.white
    },
    secondaryText: {
        color: colors.primary,
    },
});
