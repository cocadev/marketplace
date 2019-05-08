import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { colors } from '../../../theme/variables';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type Props = {
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    viewStyle?: ViewStyle;
}

export const Content: React.SFC<Props> = props => {
    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            keyboardShouldPersistTaps={'handled'}
            style={[{
                backgroundColor: colors.transparent,
            }, props.style]} contentContainerStyle={[props.containerStyle]}>
            {props.children}
        </KeyboardAwareScrollView>
    );
};
