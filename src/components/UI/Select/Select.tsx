import * as React from 'react';
import { Component } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from '../../../theme/variables';
import RNPickerSelect from 'react-native-picker-select';
import { Label } from '..';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
	onDownArrow?: any;
	onDonePress?: any;
	onValueChange?: any;
	placeholder: string;
	value;
	hideIcon?;
	style?: StyleProp<ViewStyle>;
	pickerStyle?: {
		placeholder?: StyleProp<ViewStyle>;
		inputIOS?: StyleProp<ViewStyle>;
		inputAndroid?: StyleProp<ViewStyle>;
	};
	invalid?: boolean;
	required?: boolean;
	message?: any;
	items: Array<{ label; value }>;
};

export class Select extends Component<Props, any> {
	onValueChange = (value) => this.props.onValueChange(value === null ? '' : value);

	render() {
		const placeholder = {
			label: '',
			value: '',
			color: colors.grey
		};
		if (this.props.pickerStyle) {
			pickerStyle = {
				// @ts-ignore
				...pickerStyle,
				inputIOS: { ...pickerStyle.inputIOS, ...this.props.pickerStyle.inputIOS },
				// @ts-ignore
				inputAndroid: { ...pickerStyle.inputAndroid, ...this.props.pickerStyle.inputAndroid }
			};
		}
		return (
			<View style={this.props.style}>
				{this.props.placeholder ? (
					<Label
						color={colors.black}
						style={{
							position: 'absolute',
							left: 0,
							top: !this.props.value ? 15 : -5,
							fontSize: !this.props.value ? 14 : 12,
							color: !this.props.value ? colors.grey : colors.primary
						}}
					>
						{this.props.placeholder}{' '}
						{this.props.required && (
							<Text style={{ color: !this.props.value ? colors.red : colors.primary }}>*</Text>
						)}
					</Label>
				) : null}
				<RNPickerSelect
					placeholder={placeholder}
					items={this.props.items}
					useNativeAndroidPickerStyle={false}
					onValueChange={this.onValueChange}
					style={pickerStyle}
					Icon={() => <Icon name="ios-arrow-down" size={15} style={{ right: 10, top: 20 }} />}
					value={this.props.value}
					onDownArrow={this.props.onDownArrow}
					onDonePress={this.props.onDonePress}
				/>
				{this.props.invalid && <Label color={colors.red} size={'s'} text={this.props.message} />}
			</View>
		);
	}
}

let pickerStyle = StyleSheet.create({
	placeholder: {
		color: colors.grey,
		fontSize: 14
	},
	inputIOS: {
		fontSize: 14,
		padding: 10,
		paddingLeft: 0,
		borderBottomWidth: 1,
		borderColor: colors.grey,
		color: 'black',
		paddingRight: 30 // to ensure the text is never behind the icon
	},
	inputAndroid: {
		fontSize: 14,
		padding: 10,
		paddingLeft: 0,
		borderBottomWidth: 1,
		borderColor: colors.grey,
		color: 'black',
		paddingRight: 30 // to ensure the text is never behind the icon
	}
});
