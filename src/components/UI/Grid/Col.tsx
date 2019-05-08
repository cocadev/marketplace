import * as React from 'react';
import { SFC } from 'react';
import { View, ViewProps } from 'react-native';
import { colors } from '../../../theme/variables';

type Props = ViewProps & {
    col?: number
}
export const Col: SFC<Props> = props => {
    return (
        <View  {...props} style={[{ backgroundColor: colors.transparent, flex: props.col || 1 }, props.style]}>
            {props.children}
        </View>
    );
};

