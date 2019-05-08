import React, { Component, createRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { NavigationComponentProps } from 'react-native-navigation';
import { Button, Container, Content, FloatingTextInput, Input, Label, Touchable } from "../../../components/UI";
import { colors, theme } from "../../../theme/variables";
import * as Yup from 'yup';
import { Formik } from "formik";
import { screens } from "../../../config/navigation";

type Props = NavigationComponentProps & {};


const validation = Yup.object().shape({
    token: Yup.string()
        .required('Token is required'),
});

export class ForgotPasswordCodeScreen extends Component<Props & { email }, any> {
    private _textRefs = Array.from(Array(1)).map(p => createRef<FloatingTextInput>());
    public state: any = {};

    public nextClickHandler = async (model) => {
        this.setState({isLoading: true});
        try {
            this.props.navigator.push({
                ...screens.AUTH.PasswordScreen,
                passProps: {...model, email: this.props.email}
            })
        } catch (e) {
        }
        this.setState({isLoading: false});
    }


    public render() {
        return (
            <Container isLoading={this.state.isLoading}>
                <Content style={styles.container}>
                    <Label fontSize={16} text={'We have send verification code on your email address'}
                           style={styles.infoTitle}/>
                    <Formik
                        initialValues={{token: ''}}
                        validationSchema={validation}
                        onSubmit={this.nextClickHandler}
                    >
                        {({errors, values, handleChange, handleBlur, touched, handleSubmit}) => (
                            <View style={styles.container}>
                                <View style={{alignItems: 'center', marginTop: '30%', marginBottom: '40%',}}>
                                    <Label fontSize={12} text={'Enter Code'} color={colors.greyDark} style={theme.mB1}/>
                                    <Input
                                        textStyle={styles.text}
                                        style={styles.textView}
                                        value={values.token}
                                        onChangeText={handleChange('token')}
                                        invalid={touched.token && !!errors.token}
                                        message={errors.token}
                                        returnKeyType="done"/>
                                </View>
                                <Button
                                    title={'Continue'}
                                    style={styles.button}
                                    onPress={handleSubmit}>
                                </Button>
                                <Touchable onPress={() => this.props.navigator.pop()}>
                                    <Label fontSize={16} text={'< CANCEL'} color={colors.primary}
                                           style={{alignSelf: 'center'}}/>
                                </Touchable>
                            </View>
                        )}
                    </Formik>

                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    textView: {
        width: moderateScale(150),
        height: moderateScale(40),
        borderRadius: 25,
        borderColor: colors.grey,
        backgroundColor: colors.bgGrey
    },
    text: {
        borderBottomWidth: 0,
        fontSize: 18,
        textAlign: 'center'
    },
    infoTitle: {
        width: '99%',
        textAlign: 'center',
        margin: 10,
        marginBottom: 20,
        color: colors.greyDark,
        padding: 10,
        alignSelf: 'center'
    },
    button: {alignSelf: 'center', margin: moderateScale(10), marginTop: moderateScale(50), width: '90%'},
    logo: {alignItems: 'center', alignSelf: 'center'},
    subText: {margin: 10, textAlign: 'center'},
    mainText: {textAlign: 'center', marginTop: 50, marginBottom: 50, margin: 10},
    container: {
        padding: moderateScale(10),
    },
    imageView: {justifyContent: 'center', alignItems: 'center', margin: moderateScale(20)}
});

