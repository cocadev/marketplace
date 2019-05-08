import React, { Component, createRef } from 'react';
import { Alert, AsyncStorage, Linking, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors, pickerStyle, theme } from '../../../theme/variables';
import { NavigationComponentProps } from 'react-native-navigation';
import { Button, Container, Content, FloatingTextInput, Label, Touchable } from "../../../components/UI";
import { register } from "../../../api/auth";
import { Select } from "../../../components/UI/Select/Select";
import { screens } from "../../../config/navigation";
import { titles } from "../../../config/constants";
import { User } from "../../../models/user";
import * as Yup from "yup";
import { Formik } from "formik";
import { CheckBox } from "../../../components/UI/CheckBox";
import { URLS } from "../../../api/URLS";

type Props = NavigationComponentProps & {};
type State = Partial<User> & {
    validations: any;
    isLoading?: boolean;
};


const validation = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    title: Yup.string().required('Title is required'),
    last_name: Yup.string().required('Last Name is required'),
    phone: Yup.string().required('Mobile is required'),
    email: Yup.string().email('Enter valid email').required('Email is required'),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords should match').required('Password Confirmation is required'),
    password: Yup.string()
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be 8 digits and contain upper case, lower case, number and special characters')
        .required('Password is required'),
    terms: Yup.bool().oneOf([true], 'Please accept the terms and conditions'),

});

export class PersonalDetailsScreen extends Component<Props, any> {
    public state: any = {
        initValue: {
            first_name: '',
            title: '',
            middle_name: '',
            last_name: '',
            phone: '',
            password_confirmation: '',
            email: '',
            password: '',
            terms: false
        }
    };
    private _textRefs = Array.from(Array(6)).map(p => createRef<FloatingTextInput>());
    private formik = createRef<Formik>();
    public loginClickHandler = () => {
        this.props.navigator.push(screens.AUTH.LOGIN);
    }
    public signupClickHandler = async (data) => {
        this.setState({isLoading: true});
        try {
            const user = await register({
                ...data,
                username: data.first_name,
            });
            await AsyncStorage.setItem('USER', JSON.stringify({id: user.data.user_id, account: user.data.account}));
            this.setState({isLoading: false});
            this.props.navigator.push({...screens.AUTH.INVESTMENT_PLAN, passProps: {user: data}});
        } catch (error) {
            this.setState({isLoading: false});
            try {
                if (error.response) {
                    this.formik.current.setErrors(error.response.data);
                    if (error.response.data && (error.response.data.message || error.response.data.exception)) {
                        Alert.alert('Error', 'Something went wrong! Please try again.');
                    }
                }
            } catch (e) {
                Alert.alert('Error', 'Something went wrong! Please try again.');
            }
        }
    };

    public render() {
        const {initValue} = this.state;
        return (
            <Container isLoading={this.state.isLoading}>
                <Content style={styles.container}>
                    <Label fontSize={16} text={'Please fill your information'} style={theme.infoTitle}/>
                    <Formik
                        ref={this.formik}
                        initialValues={initValue}
                        validationSchema={validation}
                        onSubmit={this.signupClickHandler}>
                        {({errors, values, handleChange, handleBlur, touched, handleSubmit, setErrors}) => (
                            <View style={styles.container}>
                                <Select
                                    placeholder="Title"
                                    items={titles}
                                    pickerStyle={pickerStyle.mB1}
                                    value={values.title}
                                    onValueChange={handleChange('title')}
                                    invalid={touched.title && !!errors.title}
                                    message={errors.title}
                                    onDownArrow={() => this._textRefs[0].current.focus()}
                                    onDonePress={() => this._textRefs[0].current.focus()}
                                />
                                <FloatingTextInput
                                    ref={this._textRefs[0]}
                                    style={theme.mB1}
                                    label={'First Name'}
                                    value={values.first_name}
                                    onChangeText={handleChange('first_name')}
                                    invalid={touched.first_name && !!errors.first_name}
                                    message={errors.first_name}
                                    onBlur={handleBlur('first_name')}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this._textRefs[1].current.focus()}/>

                                <FloatingTextInput
                                    ref={this._textRefs[1]}
                                    style={theme.mB1} label={'Last Name'}
                                    value={values.last_name}
                                    onChangeText={handleChange('last_name')}
                                    invalid={touched.last_name && !!errors.last_name}
                                    message={errors.last_name}
                                    onBlur={handleBlur('last_name')}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this._textRefs[2].current.focus()}/>
                                <FloatingTextInput
                                    ref={this._textRefs[2]}
                                    style={theme.mB1} label={'Mobile'}
                                    value={values.phone}
                                    onChangeText={handleChange('phone')}
                                    invalid={touched.phone && !!errors.phone}
                                    message={errors.phone}
                                    onBlur={handleBlur('phone')}
                                    keyboardType="phone-pad"
                                    returnKeyType="next"
                                    onSubmitEditing={() => this._textRefs[3].current.focus()}/>
                                <FloatingTextInput
                                    ref={this._textRefs[3]}
                                    style={theme.mB1} label={'Email'}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    invalid={touched.email && !!errors.email}
                                    message={errors.email}
                                    onBlur={handleBlur('email')}
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    onSubmitEditing={() => this._textRefs[4].current.focus()}/>

                                <FloatingTextInput
                                    ref={this._textRefs[4]}
                                    style={theme.mB1} label={'Create Password'}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    invalid={touched.password && !!errors.password}
                                    message={errors.password}
                                    onBlur={handleBlur('password')}
                                    returnKeyType="next"
                                    secureTextEntry
                                    onSubmitEditing={() => this._textRefs[5].current.focus()}/>
                                <FloatingTextInput
                                    ref={this._textRefs[5]}
                                    style={theme.mB2} label={'Confirm Password'}
                                    value={values.password_confirmation}
                                    onChangeText={handleChange('password_confirmation')}
                                    invalid={touched.password_confirmation && !!errors.password_confirmation}
                                    message={errors.password_confirmation}
                                    onBlur={handleBlur('password_confirmation')}
                                    secureTextEntry
                                    autoCorrect={false}
                                    returnKeyType="next"/>
                                <CheckBox onClick={handleChange('terms')} isChecked={values.terms} size={30}
                                          invalid={touched.terms && !!errors.terms}
                                          rightTextView={<Touchable
                                              style={{flexDirection: 'row'}}
                                              onPress={() => Linking.canOpenURL(URLS.RISK_ADVISORY).then(supported => supported && Linking.openURL(URLS.TERMS))}>
                                              <Label text={'I agree to the '} color={colors.grey}/>
                                              <Label text={'terms and conditions'} color={colors.primary}/>
                                          </Touchable>}
                                          message={errors.terms} style={theme.mR1}/>
                                <Button
                                    title={'Join Now'}
                                    style={theme.button}
                                    onPress={handleSubmit}>
                                </Button>
                                <Touchable
                                    onPress={() => Linking.canOpenURL(URLS.RISK_ADVISORY).then(supported => supported && Linking.openURL(URLS.RISK_ADVISORY))}>
                                    <Label fontSize={16} text={'or View detailed risk disclosure'}
                                           color={colors.primary}
                                           style={{alignSelf: 'center', margin: 10}}/>
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
    subText: {margin: 10, textAlign: 'center'},
    logo: {margin: 10, marginTop: 30, marginBottom: 30, alignItems: 'center', alignSelf: 'center'},
    container: {
        padding: moderateScale(10),
    },
    imageView: {justifyContent: 'center', alignItems: 'center', margin: moderateScale(20)}
});
