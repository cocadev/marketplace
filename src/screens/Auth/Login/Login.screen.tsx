import React, { Component, createRef } from 'react';
import { Alert, AsyncStorage, Linking, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { NavigationComponentProps } from 'react-native-navigation';
import { Button, Container, Content, FloatingTextInput, Label, Touchable } from "../../../components/UI";
import { colors, theme } from "../../../theme/variables";
import * as Yup from 'yup';
import { Formik } from "formik";
import { login } from "../../../api/auth";
import { screens } from "../../../config/navigation";
import { URLS } from "../../../api/URLS";
import { User } from "../../../models/user";

type Props = NavigationComponentProps & {};


const validation = Yup.object().shape({
    username: Yup.string()
        .email('Enter valid Email')
        .required('Email is required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Password is required')
});

export class LoginScreen extends Component<Props, any> {
    private _textRefs = Array.from(Array(1)).map(p => createRef<FloatingTextInput>());
    public state: any = {};
    public signupClickHandler = () => {
        this.props.navigator.push(screens.AUTH.REGISTER);
    }
    public loginClickHandler = async (model) => {
        this.setState({isLoading: true});
        try {
            const data = await login(model);
            this.setState({isLoading: false});
            await AsyncStorage.setItem('USER', JSON.stringify(data.data));
            this.startApp(screens.WELCOME);
        } catch (e) {
            this.setState({isLoading: false});
            let message = 'Your login details are invalid. Try again';
            if (e.response && e.response.data && e.response.data.error && typeof e.response.data.error === 'string') {
                message = e.response.data.error;
            }
            Alert.alert('Error', message);
        }
        this.setState({isLoading: false});
    }

    startApp(screen?) {
        if (!screen) {
            screen = screens.AUTH.INVESTMENT_PLAN;
        }
        AsyncStorage.getItem('USER')
            .then(u => {
                let passProps = {title: ''};
                if (u) {
                    const user: User = JSON.parse(u);
                    if (user.plan_to_invest && +user.plan_to_invest < 25000) {
                        screen = screens.WELCOME;
                    } else if (!user.plan_to_invest) {
                        screen = screens.AUTH.INVESTMENT_PLAN;
                    } else if (!user.dob) {
                        screen = screens.PersonalInformation;
                    } else if (!user.employment_type) {
                        screen = screens.EmploymentInformation;
                    } else if (!user.net_worth) {
                        screen = screens.FinancialInformation;
                    } else if (!user.utility_bill) {
                        screen = screens.UserUpload;
                    } else {
                        screen = screens.WELCOME;
                    }
                    if (user.signup_type != null) {
                        if (user.signup_type === 1) {
                            passProps.title = 'Managed Portfolio'
                        } else {
                            passProps.title = 'Individual Savings Account (ISA)'
                        }
                    }
                    this.props.navigator.resetTo({...screen, passProps, animationType: 'fade'})
                }
            });
    }

    public render() {
        return (
            <Container isLoading={this.state.isLoading}>
                <Content style={styles.container}>
                    <Label fontSize={16} text={'Please enter your credentials'} style={styles.infoTitle}/>
                    <Formik
                        initialValues={{username: '', password: ''}}
                        validationSchema={validation}
                        onSubmit={this.loginClickHandler}
                    >
                        {({errors, values, handleChange, handleBlur, touched, handleSubmit}) => (
                            <View style={styles.container}>

                                <FloatingTextInput
                                    style={theme.mB1} label={'Email'}
                                    value={values.username}
                                    onChangeText={val => handleChange('username')(val.trim())}
                                    invalid={touched.username && !!errors.username}
                                    message={errors.username}
                                    onBlur={handleBlur('username')}
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    onSubmitEditing={() => this._textRefs[0].current.focus()}/>
                                <FloatingTextInput
                                    ref={this._textRefs[0]}
                                    style={theme.mB1} label={'Password'}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    invalid={touched.password && !!errors.password}
                                    message={errors.password}
                                    returnKeyType="done"
                                    secureTextEntry/>
                                <Touchable onPress={() => this.props.navigator.push(screens.AUTH.ForgotPassword)}>
                                    <Label fontSize={12} text={'Forgot your Password?'} color={colors.greyDark}
                                           style={{alignSelf: 'flex-end'}}/>
                                </Touchable>
                                <Button
                                    title={'SIGN IN'}
                                    style={styles.button}
                                    onPress={handleSubmit}>
                                </Button>
                                <Touchable
                                    onPress={() => Linking.canOpenURL(URLS.RISK_ADVISORY).then(supported => supported && Linking.openURL(URLS.RISK_ADVISORY))}>
                                    <Label fontSize={16} text={'or View detailed risk disclosure'}
                                           color={colors.primary}
                                           style={{alignSelf: 'center', marginTop: 10}}/>
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

