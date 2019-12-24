import * as React from 'react';
import { SFC } from 'react';
import { Platform, TouchableNativeFeedback, TouchableNativeFeedbackProps, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../theme/variables';

type Props = TouchableNativeFeedbackProps & {};
export const Touchable: SFC<Props> = (props) => {
	const isIOS = Platform.OS === 'ios';
	if (!isIOS) {
		return (
			<TouchableNativeFeedback {...props}>
				<View style={[ { backgroundColor: colors.transparent }, props.style ]}>{props.children}</View>
			</TouchableNativeFeedback>
		);
	}
	return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
};
