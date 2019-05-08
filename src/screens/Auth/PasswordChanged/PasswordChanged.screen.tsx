import React, { Component, createRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { NavigationComponentProps } from 'react-native-navigation';
import { Button, Container, Content, FloatingTextInput, Label } from "../../../components/UI";
import { colors, theme } from "../../../theme/variables";
import * as Yup from 'yup';
import { screens } from "../../../config/navigation";
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = NavigationComponentProps & {};


const validation = Yup.object().shape({
    email: Yup.string()
        .email('Enter valid Email.')
        .required('Email is required.'),
});

export class PasswordChangedScreen extends Component<Props, any> {
    private _textRefs = Array.from(Array(1)).map(p => createRef<FloatingTextInput>());

    public nextClickHandler = async (model) => {
        this.props.navigator.push({...screens.AUTH.ForgotPasswordCode, passProps: model})
    }


    public render() {
        return (
            <Container>
                <Content style={styles.container}>
                    <View style={styles.inputView}>
                        <Label fontSize={16} text={'Your Password has been changed successfully!'}
                               style={styles.infoTitle}/>
                        <Icon name={'lock'} color={colors.primary} style={{alignSelf: 'center', marginTop: 30}}
                              size={150}/>
                    </View>
                    <Button
                        title={'Confirm'}
                        style={theme.button}
                        onPress={() => this.props.navigator.resetTo(screens.AUTH.START)}>
                    </Button>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    infoTitle: {
        width: '99%',
        textAlign: 'center',
        margin: 10,
        marginBottom: 20,
        color: colors.greyDark,
        padding: 10,
        alignSelf: 'center'
    },
    inputView: {
        marginBottom: 10,
        paddingBottom: '45%',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        padding: 20,
        alignSelf: 'center',
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 5
    },
    container: {
        padding: moderateScale(10),
    },
});

