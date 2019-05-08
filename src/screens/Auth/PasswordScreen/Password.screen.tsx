import React, { Component, createRef } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { NavigationComponentProps } from 'react-native-navigation';
import { Button, Container, Content, FloatingTextInput } from "../../../components/UI";
import { colors, theme } from "../../../theme/variables";
import * as Yup from 'yup';
import { Formik } from "formik";
import { remindPassword } from "../../../api/auth";
import { screens } from "../../../config/navigation";

type Props = NavigationComponentProps & {};


const validation = Yup.object().shape({
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords should match').required('Password Confirmation is required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password should be greater then 8 characters and must contain one special character, one number and one capital character')
        .required('Password is required'),
});

export class PasswordScreen extends Component<Props & { email, token }, any> {
    private _textRefs = Array.from(Array(1)).map(p => createRef<FloatingTextInput>());
    public state: any = {};
    public signupClickHandler = () => {
        this.props.navigator.push(screens.AUTH.REGISTER);
    }
    public nextClickHandler = async (model) => {
        this.setState({isLoading: true});
        try {
            await remindPassword(model);
            this.props.navigator.push(screens.AUTH.PasswordChanged);
        } catch (e) {
            Alert.alert('Error', 'Invalid Code.');
        }
        this.setState({isLoading: false});
    }


    public render() {
        return (
            <Container isLoading={this.state.isLoading}>
                <Content style={styles.container}>
                    <Formik
                        initialValues={{
                            password: '',
                            password_confirmation: '',
                            token: this.props.token,
                            email: this.props.email
                        }}
                        validationSchema={validation}
                        onSubmit={this.nextClickHandler}
                    >
                        {({errors, values, handleChange, handleBlur, touched, handleSubmit}) => (
                            <View>
                                <View style={styles.inputView}>
                                    <FloatingTextInput
                                        style={theme.mB1} label={'New Password'}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        invalid={touched.password && !!errors.password}
                                        message={errors.password}
                                        onBlur={handleBlur('password')}
                                        secureTextEntry
                                        returnKeyType="done"
                                    />
                                    <FloatingTextInput
                                        secureTextEntry
                                        style={theme.mB1} label={'Confirm Password'}
                                        value={values.password_confirmation}
                                        onChangeText={handleChange('password_confirmation')}
                                        invalid={touched.password_confirmation && !!errors.password_confirmation}
                                        message={errors.password_confirmation}
                                        onBlur={handleBlur('password_confirmation')}
                                        returnKeyType="done"
                                    />

                                </View>
                                <Button
                                    title={'Confirm Password'}
                                    style={styles.button}
                                    onPress={handleSubmit}>
                                </Button>
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
        paddingLeft: 40,
        width: moderateScale(150),
        height: moderateScale(40),
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: colors.grey,
        backgroundColor: colors.bgGrey
    },
    text: {
        borderBottomWidth: 0,
        fontSize: 18
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
    inputView: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        padding: 20,
        alignSelf: 'center',
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 5
    },
});

