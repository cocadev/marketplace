import * as React from 'react';
import { createRef } from 'react';
import { Animated, StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View } from 'react-native';
import { colors } from '../../../theme/variables';
import { Label } from '../';
import TextInputMask from 'react-native-text-input-mask';

interface state {
    isFocused: boolean;
}

type Props = TextInputProps & {
    color?: string;
    weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    fontSize?: number;
    opacity?: number;
    message?: any,
    invalid?: boolean,
    required?: boolean;
    text?: string;
    textStyle?: StyleProp<TextStyle>;
    label: string;
    iconName?,
    iconSize?
    mask?
}

export class FloatingTextInput extends React.Component<Props, state> {
    private textInput = createRef<TextInput>();
    state = {
        isFocused: false,
    };
    private _animatedIsFocused: Animated.Value;

    componentWillMount() {
        this._animatedIsFocused = new Animated.Value(this.props.value ? 1 : 0);
    }

    handleFocus = () => {
        this.props.onFocus && this.props.onFocus(null);
        this.setState({isFocused: true});
    };
    handleBlur = () => {
        this.setState({isFocused: false});
        this.props.onBlur && this.props.onBlur(null);
    };

    focus = () => {
        this.textInput.current.focus();
    }

    componentDidUpdate() {
        Animated.timing(this._animatedIsFocused, {
            toValue: (this.state.isFocused || this.props.value) ? 1 : 0,
            duration: 200,
        }).start();
    }

    render() {
        const {label, ...props} = this.props;
        const labelStyle = {
            position: 'absolute',
            left: props.iconName ? 30 : 0,
            top: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
            }),
            fontSize: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 12],
            }),
            color: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [colors.grey, colors.primary],
            }),

        };
        const style: any[] = [styles.base, this.props.textStyle, {
            color: this.props.color || colors.black,
            fontSize: this.props.fontSize || 13,
            fontWeight: this.props.weight || 'normal',
            opacity: this.props.opacity || 1,
            paddingLeft: props.iconName ? 30 : 0,
            borderBottomColor: props.value ? colors.primary : colors.greyDark,
            borderBottomWidth: props.value ? 1 : 0.8
        }];
        return (
            <View style={[{paddingTop: 7,}, this.props.style]}>
                <Animated.Text style={labelStyle}>
                    {label} {this.props.required &&
                <Text style={{color: !this.props.value ? colors.red : colors.primary}}>*</Text>}
                </Animated.Text>
                {this.props.mask ? <TextInputMask
                                     {...props}
                                     style={style}
                                     ref={this.textInput}
                                     onFocus={this.handleFocus}
                                     onBlur={this.handleBlur}
                                 /> :
                 <TextInput
                     {...props}
                     style={style}
                     ref={this.textInput}
                     onFocus={this.handleFocus}
                     onBlur={this.handleBlur}
                     blurOnSubmit
                 />
                }
                {props.invalid && <Label style={{color: colors.red}}>{props.message}</Label>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        padding: 8,
        flex: 1,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.grey
    },
    icon: {
        marginRight: 10
    }
});
