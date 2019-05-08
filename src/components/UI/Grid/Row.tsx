import * as React from 'react';
import { SFC } from 'react';
import { View, ViewProps } from 'react-native';
import { colors } from '../../../theme/variables';

type Props = ViewProps & {}
export const Row: SFC<Props> = props => {
    return (
        <View  {...props} style={[{ backgroundColor: colors.transparent, flexDirection: 'row' }, props.style]}>
            {props.children}
        </View>
    );
};

