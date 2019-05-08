import * as React from 'react';
import { StyleProp, View, ViewStyle, Platform } from 'react-native';
import { colors } from '../../../theme/variables';
import { Loading } from '../Loading/Loading';

type Props = {
    style?: StyleProp<ViewStyle>;
    isLoading?: boolean;
    FAB?: {
        icon: any,
        color?: string,
        name?: string,
        onPress: () => any
    };
}
export const Container: React.SFC<Props> = props => {
    return (
        <View style={[{flex: 1, backgroundColor: colors.bgWhite, paddingTop:Platform.OS === 'android'? 50:0}, props.style]}
              pointerEvents={props.isLoading ? 'none' : 'auto'}>
            {props.children}
            <Loading isLoading={props.isLoading}/>
        </View>
    );
};

