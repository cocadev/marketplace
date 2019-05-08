import React, { Component, createRef } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { theme } from '../theme/variables';
import { NavigationComponentProps } from 'react-native-navigation';
import { Button, Container, Content, FloatingTextInput, Label } from "../components/UI";
import { Select } from "../components/UI/Select/Select";
import { screens } from "../config/navigation";
import { countries, employment_type, nature_of_business } from "../config/constants";
import { User } from "../models/user";
import * as Yup from "yup";
import { Formik } from "formik";
import { userUpdate } from "../api/auth";

type Props = NavigationComponentProps & {
    user: Partial<User>,
    title: string;
};
type State = Partial<User> & {
    validations: any;
    isLoading?: boolean;
};

const validation = Yup.object().shape({
    employment_type: Yup.string().required('Employment Type is required'),
    employer: Yup.string().required('Company Name is required'),
});
let initialValues = {
    dependants_number: '',
    employment_type: '',
    employer: '',
}

export class EmploymentInformationScreen extends Component<Props, any> {
    private _textRefs = Array.from(Array(5)).map(p => createRef<FloatingTextInput>());
    public nextClickHandler = async (data) => {
        try {
            this.setState({isLoading: true});
            const res = await userUpdate(data);
            this.setState({isLoading: false});
            const passProps = {title: this.props.title};
            initialValues = {
                dependants_number: '',
                employment_type: '',
                employer: '',
            }
            this.props.navigator.push({...screens.FinancialInformation, passProps})
        } catch (e) {
            this.setState({isLoading: false});
            Alert.alert('Error', 'Something went wrong! Please try again.')
        }
        this.setState({isLoading: false});
    };
    public state: any = {};

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
                    <Formik
                        validate={this.validate}
                        initialValues={initialValues as Partial<User>}
                        validationSchema={validation}
                        onSubmit={this.nextClickHandler}>
                        {({errors, values, handleChange, handleBlur, touched, handleSubmit}) => (
                            <View>
                                <Label fontSize={16} text={'Please fill your Employment Information'}
                                       style={theme.infoTitle}/>
                                <Select
                                    required
                                    placeholder="Employment Type"
                                    items={employment_type}
                                    pickerStyle={pickerStyle}
                                    value={values.employment_type}
                                    onValueChange={handleChange('employment_type')}
                                    invalid={touched.employment_type && !!errors.employment_type}
                                    message={errors.employment_type}
                                />

                                <FloatingTextInput
                                    required
                                    label={'Company Name'}
                                    style={theme.mB1}
                                    value={values.employer}
                                    invalid={touched.employer && !!errors.employer}
                                    message={errors.employer}
                                    onChangeText={handleChange('employer')}
                                    returnKeyType="next"/>
                                <Select
                                    placeholder="Nature of business"
                                    items={nature_of_business}
                                    pickerStyle={pickerStyle}
                                    onValueChange={handleChange('nature_of_business')}
                                    value={values.nature_of_business}
                                />

                                <FloatingTextInput
                                    label={'Occupation'}
                                    style={theme.mB1}
                                    value={values.occupation}
                                    onChangeText={handleChange('occupation')}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this._textRefs[0].current.focus()}/>

                                <FloatingTextInput
                                    label={'Company Address 1'}
                                    ref={this._textRefs[0]}
                                    style={theme.mB1}
                                    value={values.employer_street_1}
                                    onChangeText={handleChange('employer_street_1')}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this._textRefs[1].current.focus()}/>

                                <FloatingTextInput
                                    label={'Company Address 2'}
                                    ref={this._textRefs[1]}
                                    style={theme.mB1}
                                    value={values.employer_street_2}
                                    onChangeText={handleChange('employer_street_2')}
                                    returnKeyType="done"
                                />
                                <Select
                                    placeholder="Country"
                                    items={countries}
                                    pickerStyle={pickerStyle}
                                    onValueChange={handleChange('employer_country')}
                                    value={values.employer_country}
                                />

                                <FloatingTextInput
                                    label={'State/Province'}
                                    ref={this._textRefs[2]}
                                    style={theme.mB1}
                                    value={values.employer_state_province}
                                    onChangeText={handleChange('employer_state_province')}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this._textRefs[3].current.focus()}/>
                                <FloatingTextInput
                                    label={'City'}
                                    ref={this._textRefs[3]}
                                    style={theme.mB1}
                                    value={values.employer_city}
                                    onChangeText={handleChange('employer_city')}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this._textRefs[4].current.focus()}/>

                                <FloatingTextInput
                                    label={'Post Code'}
                                    ref={this._textRefs[4]}
                                    style={theme.mB1}
                                    value={values.employer_zip_postal_code}
                                    onChangeText={handleChange('employer_zip_postal_code')}
                                    returnKeyType="done"/>
                                <Button
                                    title={'Next'}
                                    style={theme.button}
                                    onPress={handleSubmit}>
                                </Button>
                            </View>)}
                    </Formik>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        padding: moderateScale(10),
    },
});

const pickerStyle = StyleSheet.create({
    inputIOS: theme.mB1,
    inputAndroid: theme.mB1,
})
