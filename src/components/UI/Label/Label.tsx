import * as React from 'react';
import { SFC } from 'react';
import { Text, TextProps } from 'react-native';
import { colors, fontSizes, opacities } from '../../../theme/variables';

type Props = TextProps & {
	color?: string;
	weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
	fontSize?: number;
	size?: 'xl' | 'l' | 'm' | 's' | 'xs';
	opacity?: 'primary' | 'secondary' | number;
	text?: string;
};

export const Label: SFC<Props> = (props) => {
	const fontSize = props.fontSize ? props.fontSize : props.size ? fontSizes[props.size] : fontSizes.m;
	const opacity = props.opacity ? (typeof props.opacity === 'string' ? opacities[props.opacity] : props.opacity) : 1;
	return (
		<Text
			{...props}
			style={[
				{
					opacity,
					fontSize,
					color: props.color || colors.black,
					fontWeight: props.weight || 'normal'
				},
				props.style
			]}
		>
			{props.text || props.children}
		</Text>
	);
};
