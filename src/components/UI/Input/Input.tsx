import * as React from 'react';
import { Component, createRef } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View } from 'react-native';
import { colors } from '../../../theme/variables';
import { Label, Row } from "..";

type Props = TextInputProps & {
    color?: string;
    weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    fontSize?: number;
    opacity?: number;
    message?: any,
    invalid?: boolean,
    text?: string;
    textStyle?: StyleProp<TextStyle>;
}

export class Input extends Component<Props, any> {
    private textInput = createRef<TextInput>();
    state = {
        valid: false,
        dirty: false,
        message: ''
    };

    focus() {
        this.textInput.current.focus();
    }

    textChangeHandler = (value) => {
        this.props.onChangeText(value);
    };

    render() {
        const style: any[] = [styles.base, this.props.textStyle, {
            color: this.props.color || colors.black,
            fontSize: this.props.fontSize || 13,
            fontWeight: this.props.weight || 'normal',
            opacity: this.props.opacity || 1,
        }];
        return (
            <View style={this.props.style}>
                <Row style={{alignItems: 'center',}}>
                    <TextInput
                        {...this.props}
                        ref={this.textInput}
                        onChangeText={this.textChangeHandler}
                        style={style}>
                        {this.props.children}
                    </TextInput>
                </Row>
                {this.props.invalid && <Label color={colors.red} size={'s'} text={this.props.message}/>}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    base: {
        borderBottomWidth: 0.5,
        padding: 10,
        flex: 1,
        borderColor: colors.grey
    },
    icon: {
        marginRight: 10
    }
});
