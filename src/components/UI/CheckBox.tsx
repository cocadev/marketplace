import React, { Component } from 'react';
import { StyleProp, StyleSheet, Text, TouchableHighlight, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/variables';
import { Label } from "./Label/Label";

type Props = {
    style?: StyleProp<ViewStyle>,
    message?,
    invalid?,
    leftText?: string,
    leftTextView?: any,
    rightText?: string,
    leftTextStyle?: any,
    rightTextView?: any,
    rightTextStyle?: any,
    checkedImage?: any,
    unCheckedImage?: any,
    indeterminateImage?: any,
    onClick: (checkboxState: boolean) => any,
    isChecked: boolean,
    size: number;
    isIndeterminate?: boolean,
    checkBoxColor?: string,
    checkedCheckBoxColor?: string,
    uncheckedCheckBoxColor?: string,
    disabled?: boolean,
}

export class CheckBox extends Component<Props, any> {
    static defaultProps: Props = {
        size: 24,
        isChecked: false,
        onClick: null,
        checkedCheckBoxColor: colors.primary,
        isIndeterminate: false,
        leftTextStyle: {},
        rightTextStyle: {}
    }

    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.isChecked,
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.isChecked !== nextProps.isChecked) {
            return {
                isChecked: nextProps.isChecked
            };
        }
        return null;
    }

    onClick() {
        const checkboxState = !this.state.isChecked;
        this.setState({
            isChecked: checkboxState
        })
        this.props.onClick(checkboxState);
    }

    _renderLeft() {
        if (this.props.leftTextView) return this.props.leftTextView;
        if (!this.props.leftText) return null;
        return (
            <Text style={[styles.leftText, this.props.leftTextStyle]}>{this.props.leftText}</Text>
        );
    }

    _renderRight() {
        if (this.props.rightTextView) return this.props.rightTextView;
        if (!this.props.rightText) return null;
        return (
            <Text style={[styles.rightText, this.props.rightTextStyle]}>{this.props.rightText}</Text>
        );
    }

    _renderImage() {
        if (this.props.isIndeterminate) {
            return this.props.indeterminateImage ? this.props.indeterminateImage : this.genCheckedImage();
        }
        if (this.state.isChecked) {
            return this.props.checkedImage ? this.props.checkedImage : this.genCheckedImage();
        } else {
            return this.props.unCheckedImage ? this.props.unCheckedImage : this.genCheckedImage();
        }
    }

    _getCheckedCheckBoxColor() {
        return this.props.checkedCheckBoxColor ? this.props.checkedCheckBoxColor : this.props.checkBoxColor
    }

    _getUncheckedCheckBoxColor() {
        return this.props.uncheckedCheckBoxColor ? this.props.uncheckedCheckBoxColor : this.props.checkBoxColor
    }

    _getTintColor() {
        return this.state.isChecked ? this._getCheckedCheckBoxColor() : this._getUncheckedCheckBoxColor()
    }

    genCheckedImage() {
        let source, color;
        if (this.props.isIndeterminate) {
            source = 'indeterminate-check-box'
            color = this.props.checkedCheckBoxColor;
        } else {
            source = this.state.isChecked ? 'check-box' : 'check-box-outline-blank';
            color = this.state.isChecked ? this.props.checkedCheckBoxColor : this.props.uncheckedCheckBoxColor;
        }

        return (
            <Icon name={source} color={color} size={this.props.size}/>
        );
    }

    render() {
        return (
            <React.Fragment>
                <TouchableHighlight
                    style={this.props.style}
                    onPress={() => this.onClick()}
                    underlayColor='transparent'
                    disabled={this.props.disabled}
                >
                    <View style={styles.container}>
                        {this._renderLeft()}
                        {this._renderImage()}
                        {this._renderRight()}
                    </View>
                </TouchableHighlight>
                {this.props.invalid && <Label color={colors.red} size={'s'} text={this.props.message}/>}
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftText: {
        flex: 1,
    },
    rightText: {
        flex: 1,
        marginLeft: 10
    }
});