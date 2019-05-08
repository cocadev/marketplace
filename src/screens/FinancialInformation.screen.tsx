import React, { Component, createRef } from 'react';
import { Alert, Linking, StyleSheet, View } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { colors, theme } from '../theme/variables';
import { NavigationComponentProps } from 'react-native-navigation';
import { Button, Container, Content, FloatingTextInput, Input, Label, Touchable } from "../components/UI";
import { Select } from "../components/UI/Select/Select";
import { screens } from "../config/navigation";
import {
    annual_net_income,
    countries,
    green_card_holder,
    liquid_net_income,
    net_worth,
    risk_level,
    specific_goal,
    total_assets
} from "../config/constants";
import { User } from "../models/user";
import * as Yup from "yup";
import { Formik } from "formik";
import { CheckBox } from "../components/UI/CheckBox";
import { userUpdate } from "../api/auth";
import { URLS } from "../api/URLS";

type Props = NavigationComponentProps & {
    user: Partial<User>,
    title: string;
};
type State = Partial<User> & {
    isLoading?: boolean;
};
const validation = Yup.object().shape({
    uk_ni_number: Yup.string().required('UK National Insurance Number is required'),
    green_card_holder: Yup.string().required('Field is required'),
    terms: Yup.bool().oneOf([true], 'Please accept the terms and conditions'),
    net_worth: Yup.string().required('Net Worth is required'),
    liquid_net_income: Yup.string().required('Liquid Net Income is required'),
    annual_net_income: Yup.string().required('Annual Net Income is required'),
    total_assets: Yup.string().required('Total Assets is required'),
    specific_goal: Yup.string().required('Specific Goal is required'),
    risk_level: Yup.string().required('Risk Level is required'),
});
let initialValues = {
    net_worth: '',
    liquid_net_income: '',
    annual_net_income: '',
    total_assets: '',
    specific_goal: '',
    risk_level: '',
    uk_ni_number: '',
    green_card_holder: '',
    terms: false,
    baseCurrency: 'GBP'
};

export class FinancialInformationScreen extends Component<Props, any> {
    private _textRefs = Array.from(Array(3)).map(p => createRef<Input>());
    public state: any = {};

    constructor(props) {
        super(props);

        this.props.navigator.setTitle({title: this.props.title});
    }

    validate = (values) => {
        initialValues = values;
        return {}
    }

    public nextClickHandler = async (data) => {
        try {
            this.setState({isLoading: true});
            const res = await userUpdate(data);
            this.setState({isLoading: false});
            const passProps = {title: this.props.title,};
            initialValues = {
                net_worth: '',
                liquid_net_income: '',
                annual_net_income: '',
                total_assets: '',
                specific_goal: '',
                risk_level: '',
                uk_ni_number: '',
                green_card_holder: '',
                terms: false,
                baseCurrency: 'GBP'
            };
            this.props.navigator.push({...screens.UserUpload, passProps})
        } catch (e) {
            this.setState({isLoading: false});
            Alert.alert('Error', 'Something went wrong! Please try again.')
        }
        this.setState({isLoading: false});
    };

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
                                <Label fontSize={16} text={'Please fill your Financial Information'}
                                       style={theme.infoTitle}/>
                                <FloatingTextInput
                                    required
                                    label={'Base Currency'}
                                    style={theme.mB1}
                                    value={'GBP'}
                                    editable={false}
                                    returnKeyType="next"
                                />

                                <Select
                                    required
                                    placeholder="Net Worth"
                                    items={net_worth}
                                    pickerStyle={pickerStyle}
                                    onValueChange={handleChange('net_worth')}
                                    value={values.net_worth}
                                    invalid={touched.net_worth && !!errors.net_worth}
                                    message={errors.net_worth}
                                />
                                <Select
                                    required
                                    placeholder="Liquid Net Worth"
                                    items={liquid_net_income}
                                    pickerStyle={pickerStyle}
                                    onValueChange={handleChange('liquid_net_income')}
                                    value={values.liquid_net_income}
                                    invalid={touched.liquid_net_income && !!errors.liquid_net_income}
                                    message={errors.liquid_net_income}
                                />
                                <Select
                                    required
                                    placeholder="Annual Income (taxable)"
                                    items={annual_net_income}
                                    pickerStyle={pickerStyle}
                                    onValueChange={handleChange('annual_net_income')}
                                    value={values.annual_net_income}
                                    invalid={touched.annual_net_income && !!errors.annual_net_income}
                                    message={errors.annual_net_income}
                                />
                                <Select
                                    required
                                    placeholder="Total Assets"
                                    items={total_assets}
                                    pickerStyle={pickerStyle}
                                    onValueChange={handleChange('total_assets')}
                                    invalid={touched.total_assets && !!errors.total_assets}
                                    message={errors.total_assets}
                                    value={values.total_assets}
                                />
                                <Select
                                    required
                                    placeholder="Main Goal for Investment"
                                    items={specific_goal}
                                    pickerStyle={pickerStyle}
                                    onValueChange={handleChange('specific_goal')}
                                    invalid={touched.specific_goal && !!errors.specific_goal}
                                    message={errors.specific_goal}
                                    value={values.specific_goal}
                                />
                                <Select
                                    required
                                    placeholder="Select your Risk Level"
                                    items={risk_level}
                                    pickerStyle={pickerStyle}
                                    invalid={touched.risk_level && !!errors.risk_level}
                                    message={errors.risk_level}
                                    onValueChange={handleChange('risk_level')}
                                    value={values.risk_level}
                                />

                                <FloatingTextInput
                                    required
                                    label={'UK National Insurance Number'}
                                    style={theme.mB1}
                                    value={values.uk_ni_number}
                                    onChangeText={handleChange('uk_ni_number')}
                                    invalid={touched.uk_ni_number && !!errors.uk_ni_number}
                                    message={errors.uk_ni_number}
                                    returnKeyType="next"
                                />
                                <Select
                                    required
                                    placeholder='Are you a US Permanent Resident?'
                                    items={green_card_holder}
                                    pickerStyle={pickerStyle}
                                    onValueChange={handleChange('green_card_holder')}
                                    invalid={touched.green_card_holder && !!errors.green_card_holder}
                                    message={errors.green_card_holder}
                                    value={values.green_card_holder}
                                />
                                <Select
                                    placeholder='What is your Country of Tax Residency?'
                                    items={countries}
                                    pickerStyle={pickerStyle}
                                    onValueChange={handleChange('tax_country')}
                                    value={values.tax_country}
                                />
                                <Label fontSize={14}
                                       text={`Disclaimer:`}
                                       color={colors.greyDark}/>
                                <Label fontSize={12}
                                       text={`Any financial performance figures refer to the past and that past performance is not a reliable indicator of future results.`}
                                       color={colors.greyDark}/>
                                <CheckBox onClick={handleChange('terms')} isChecked={values.terms} size={30}
                                          invalid={touched.terms && !!errors.terms}
                                          rightTextView={<Touchable
                                              style={{flexDirection: 'row'}}
                                              onPress={() => Linking.canOpenURL(URLS.TERMS).then(supported => supported && Linking.openURL(URLS.TERMS))}>
                                              <Label text={'I agree to the '} color={colors.grey}/>
                                              <Label text={'terms and conditions.'} color={colors.primary}/>
                                          </Touchable>}
                                          message={errors.terms} style={[theme.mR1, theme.mB2, theme.mT1]}/>
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
    title: {borderBottomColor: colors.grey, borderBottomWidth: 0.5},
    subText: {margin: 10,},
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
    container: {
        padding: moderateScale(10),
    },
    imageView: {justifyContent: 'center', alignItems: 'center', margin: moderateScale(20)}
});

const pickerStyle = StyleSheet.create({
    inputIOS: theme.mB1,
    inputAndroid: theme.mB1,
})
