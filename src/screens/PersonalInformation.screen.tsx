import React, { Component, createRef } from 'react';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { colors, theme } from '../theme/variables';
import { NavigationComponentProps } from 'react-native-navigation';
import { Button, Container, Content, FloatingTextInput, Label } from "../components/UI";
import { Select } from "../components/UI/Select/Select";
import { screens } from "../config/navigation";
import * as Yup from "yup";
import { Formik } from "formik";
import { User } from "../models/user";
import { countries, gender, maritialStatus } from "../config/constants";
import { userUpdate } from "../api/auth";
import { DatePicker } from "../components/UI/Datepicker/Datepicker";

type Props = NavigationComponentProps & {
    user: Partial<User>,
    title: string;
};
type State = {
    isLoading?: boolean;
};
const validation = Yup.object().shape({
    dob: Yup.string().required('DOB is required')
        .test('valid', 'Please enter valid date', (value) => {
            if (!value) return false;
            const date = value.split('-');
            return date[2] && date[1] && date[0] && date[2].length === 4 && date[1].length === 2 && date[0].length === 2 && !isNaN(Date.parse(`${date[2]}-${date[1]}-${date[0]}`))
        }),
    gender: Yup.string().required('Gender is required'),
    marital_status: Yup.string().required('Marital status is required'),
    address_1: Yup.string().required('Address is required'),
    town: Yup.string().required('City is required'),
    post_code: Yup.string().required('Post code is required'),
    nationality: Yup.string().required('Nationality is required'),
    d_country: Yup.string().required('Country is required'),
    dependants_number: Yup.number().typeError('Numbers only').required('Dependants Number is required'),

});

let initialValues = {
    dob: Platform.OS === 'ios' ? '01-01-1970' : '',
    gender: '',
    marital_status: '',
    address_1: '',
    nationality: '',
    town: '',
    post_code: '',
    d_country: '',
    dependants_number: '',
}

export class PersonalInformationScreen extends Component<Props, any> {
    private _textRefs = Array.from(Array(5)).map(p => createRef<FloatingTextInput>());
    public state: any = {};

    public nextClickHandler = async (data) => {
        try {
            this.setState({isLoading: true});
            const res = await userUpdate(data);
            this.setState({isLoading: false});
            const passProps = {title: this.props.title};
            initialValues = {
                dob: Platform.OS === 'ios' ? '01-01-1970' : '',
                gender: '',
                marital_status: '',
                address_1: '',
                nationality: '',
                town: '',
                post_code: '',
                d_country: '',
                dependants_number: '',
            }
            this.props.navigator.push({...screens.EmploymentInformation, passProps})
        } catch (e) {
            this.setState({isLoading: false});
            Alert.alert('Error', 'Something went wrong! Please try again.')
        }
        this.setState({isLoading: false});
    };

    componentWillMount(): void {
        this.props.navigator.setTitle({title: this.props.title});
    }

    validate = (values) => {
        initialValues = values;
        return {}
    }

    public render() {
        return (
            <Container isLoading={this.state.isLoading}>
                <Content style={theme.container}>
                    <Label fontSize={16} text={'Please fill your Personal Information'} style={theme.infoTitle}/>
                    <Formik
                        validate={this.validate}
                        initialValues={initialValues as Partial<User>}
                        validationSchema={validation}
                        onSubmit={this.nextClickHandler}>
                        {({errors, values, handleChange, handleBlur, touched, handleSubmit}) => (
                            <View>
                                <FloatingTextInput
                                    label={'Address 1'}
                                    style={theme.mB1}
                                    required
                                    value={values.address_1}
                                    onChangeText={handleChange('address_1')}
                                    invalid={touched.address_1 && !!errors.address_1}
                                    message={errors.address_1}
                                    onBlur={handleBlur('address_1')}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this._textRefs[0].current.focus()}/>
                                <FloatingTextInput
                                    label={'Address 2'}
                                    ref={this._textRefs[0]}
                                    style={theme.mB1}
                                    value={values.address_2}
                                    onBlur={handleBlur('address_2')}
                                    onChangeText={handleChange('address_2')}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this._textRefs[1].current.focus()}/>

                                <FloatingTextInput
                                    label={'City'}
                                    ref={this._textRefs[1]}
                                    style={[theme.mB1]}
                                    required
                                    value={values.town}
                                    onBlur={handleBlur('town')}
                                    onChangeText={handleChange('town')}
                                    invalid={touched.town && !!errors.town}
                                    message={errors.town}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this._textRefs[2].current.focus()}/>
                                <FloatingTextInput
                                    label={'Post Code'}
                                    ref={this._textRefs[2]}
                                    required
                                    style={theme.mB1}
                                    value={values.post_code}
                                    onBlur={handleBlur('post_code')}
                                    onChangeText={handleChange('post_code')}
                                    invalid={touched.post_code && !!errors.post_code}
                                    message={errors.post_code}
                                    returnKeyType="next"
                                />
                                <Select
                                    placeholder="Country"
                                    required
                                    items={countries}
                                    onValueChange={handleChange('d_country')}
                                    value={values.d_country}
                                    style={theme.mB1}
                                    invalid={touched.d_country && !!errors.d_country}
                                    message={errors.d_country}
                                />
                                <Select
                                    placeholder="Nationality"
                                    required
                                    items={countries}
                                    onValueChange={handleChange('nationality')}
                                    value={values.nationality}
                                    style={theme.mB1}
                                    invalid={touched.nationality && !!errors.nationality}
                                    message={errors.nationality}
                                />
                                {Platform.OS === 'ios' ? <DatePicker
                                                           minDate={new Date(1970)}
                                                           format="DD-MM-YYYY"
                                                           placeholder={'Date of Birth'}
                                                           required
                                                           style={theme.mB1}
                                                           invalid={touched.dob && !!errors.dob}
                                                           message={errors.dob}
                                                           value={values.dob} onSelect={(_,d) => handleChange('dob')(d)}/> :
                                 <FloatingTextInput
                                     label={'Date of Birth (dd-mm-yyyy)'}
                                     invalid={touched.dob && !!errors.dob}
                                     message={errors.dob}
                                     value={values.dob}
                                     style={[theme.mB1]}
                                     required
                                     onBlur={handleBlur('dob')}
                                     onChangeText={handleChange('dob')}
                                     returnKeyType="next"
                                     mask={'[00]{-}[00]{-}[0000]'}
                                 />
                                }
                                <Select
                                    placeholder="Gender"
                                    required
                                    items={gender}
                                    style={theme.mB1}
                                    value={values.gender}
                                    onValueChange={handleChange('gender')}
                                    invalid={touched.gender && !!errors.gender}
                                    message={errors.gender}
                                />
                                <Select
                                    required
                                    placeholder="Maritial Status"
                                    items={maritialStatus}
                                    style={theme.mB1}
                                    onValueChange={handleChange('marital_status')}
                                    value={values.marital_status}
                                    invalid={touched.marital_status && !!errors.marital_status}
                                    message={errors.marital_status}
                                />
                                <FloatingTextInput
                                    required
                                    label={'No. of Dependents'}
                                    style={theme.mB2}
                                    onChangeText={handleChange('dependants_number')}
                                    value={values.dependants_number}
                                    keyboardType="decimal-pad"
                                    invalid={touched.dependants_number && !!errors.dependants_number}
                                    message={errors.dependants_number}
                                />
                                <Button
                                    title={'Next'}
                                    style={theme.button}
                                    onPress={handleSubmit}>
                                </Button>
                            </View>
                        )}</Formik>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    title: {borderBottomColor: colors.grey, borderBottomWidth: 0.5},
    subText: {margin: 10, textAlign: 'center'},
    input: {marginBottom: 5, borderWidth: 0.5, borderBottomWidth: 0, borderColor: colors.grey},
    inputLabel: {
        padding: 10,
        paddingLeft: 0,
        marginBottom: 5,
        color: colors.primary,
        borderBottomWidth: 0.5,
        borderColor: colors.grey
    },
    infoTitle: {
        width: '99%',
        textAlign: 'center',
        margin: 10,
        marginBottom: 20,
        backgroundColor: colors.primary,
        color: colors.white,
        padding: 10,
        alignSelf: 'center'
    },
    logo: {margin: 10, marginTop: 30, marginBottom: 30, alignItems: 'center', alignSelf: 'center'},
    button: {alignSelf: 'center', margin: moderateScale(10), width: scale(150)},

    imageView: {justifyContent: 'center', alignItems: 'center', margin: moderateScale(20)}
});
