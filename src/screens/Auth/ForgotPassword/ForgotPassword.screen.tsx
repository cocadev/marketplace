import React, { Component, createRef } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { NavigationComponentProps } from 'react-native-navigation';
import { Button, Container, Content, FloatingTextInput, Label, Touchable } from "../../../components/UI";
import { colors } from "../../../theme/variables";
import * as Yup from 'yup';
import { Formik } from "formik";
import { remindPassword } from "../../../api/auth";
import { screens } from "../../../config/navigation";

type Props = NavigationComponentProps & {};


const validation = Yup.object().shape({
    email: Yup.string()
        .email('Enter valid Email')
        .required('Email is required'),
});

export class ForgotPasswordScreen extends Component<Props, any> {
    private _textRefs = Array.from(Array(1)).map(p => createRef<FloatingTextInput>());
    public state: any = {};
    public signupClickHandler = () => {
        this.props.navigator.push(screens.AUTH.REGISTER);
    }
    public nextClickHandler = async (model) => {
        this.setState({isLoading: true});
        try {
            await remindPassword(model);
            Alert.alert('Success', 'Please check your email to change password.');
            this.props.navigator.resetTo(screens.AUTH.START);
        } catch (e) {
            Alert.alert('Error', 'Invalid Email.');
        }
        this.setState({isLoading: false});
    }


    public render() {
        return (
            <Container isLoading={this.state.isLoading}>
                <Content style={styles.container}>
                    <Label fontSize={16} text={'Please enter your email address'} style={styles.infoTitle}/>
                    <Formik
                        initialValues={{email: ''}}
                        validationSchema={validation}
                        onSubmit={this.nextClickHandler}
                    >
                        {({errors, values, handleChange, handleBlur, touched, handleSubmit}) => (
                            <View style={styles.container}>

                                <FloatingTextInput
                                    style={{marginTop: '30%', marginBottom: '40%'}} label={'Email Address'}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    invalid={touched.email && !!errors.email}
                                    message={errors.email}
                                    onBlur={handleBlur('email')}
                                    returnKeyType="done"
                                />
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

