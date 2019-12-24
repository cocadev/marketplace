import * as React from 'react';
import { SFC } from 'react';
import { ActivityIndicator, Animated, Easing, Platform, StyleSheet, TouchableOpacityProps, View } from 'react-native';
import { colors, images } from '../../../theme/variables';

type Props = TouchableOpacityProps & {
	color?: string;
	isLoading: boolean;
};

export class Loading extends React.Component<Props, any> {
	RotateValueHolder = new Animated.Value(0);

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.StartImageRotateFunction();
	}

	StartImageRotateFunction() {
		this.RotateValueHolder.setValue(0);
		Animated.timing(this.RotateValueHolder, {
			toValue: 1,
			duration: 1500,
			easing: Easing.linear
		}).start(() => this.StartImageRotateFunction());
	}

	render() {
		const RotateData = this.RotateValueHolder.interpolate({
			inputRange: [ 0, 1 ],
			outputRange: [ '0deg', '360deg' ]
		});
		if (this.props.isLoading) {
			return (
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#00000050',
						position: 'absolute',
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						shadowColor: '#000',
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.8,
						shadowRadius: 2,
						elevation: 1
					}}
				>
					<Animated.Image
						style={{
							transform: [ { rotate: RotateData } ]
						}}
						source={images.greenLogo}
					/>
				</View>
			);
		}
		return null;
	}
}
