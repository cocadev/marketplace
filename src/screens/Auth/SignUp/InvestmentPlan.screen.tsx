import React, { Component, createRef } from 'react';
import { Alert, Linking, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors, theme } from '../../../theme/variables';
import { NavigationComponentProps } from 'react-native-navigation';
import { Button, Container, Content, FloatingTextInput, Label, Touchable } from "../../../components/UI";
import { Select } from "../../../components/UI/Select/Select";
import { screens } from "../../../config/navigation";
import { User } from "../../../models/user";
import { accountTypes, modelPortfolio } from "../../../config/constants";
import * as Yup from "yup";
import { Formik } from "formik";
import { userUpdate } from "../../../api/auth";
import { URLS } from "../../../api/URLS";

type Props = NavigationComponentProps & {
    user
};
type State = Partial<User> & {
    isLoading?: boolean;
    type?: number;
    amount?: string;
    amountMonthly?: string;
    duration?: string;
};

const validation = Yup.object().shape({
    signup_type: Yup.string().required('Account type is required'),
    modelPortfolio: Yup.string().required('Model Portfolio is required'),
    plan_to_invest: Yup.number().typeError('Numbers only').required('Investment is required'),
});

export class InvestmentPlanScreen extends Component<Props, State> {
    public state: State = {};
    private _textRefs = Array.from(Array(3)).map(p => createRef<FloatingTextInput>());

    public confirmClickHandler = async (data) => {
        try {
            this.setState({isLoading: true});
            const res = await userUpdate({...data});
            this.setState({isLoading: false});
            if (+data.plan_to_invest < 25000)
                this.props.navigator.push({
                    ...screens.WELCOME, passProps: {
                        title: data.signup_type === 1 ? 'Managed Portfolio' : 'ISA'
                    }
                });
            else {
                this.props.navigator.push({
                    ...screens.PersonalInformation, passProps: {
                        title: data.signup_type === 1 ? 'Managed Portfolio' : 'Individual Savings Account (ISA)'
                    }
                });
            }
        } catch (e) {
            this.setState({isLoading: false});
            Alert.alert('Error', 'Something went wrong! Please try again.')
        }
        this.setState({isLoading: false});
    };

    public render() {
        return (
            <Container isLoading={this.state.isLoading}>
                <Content>
                    <Label fontSize={16} text={'Please fill your Investment Plan'} style={theme.infoTitle}/>
                    <Formik
                        initialValues={{
                            plan_to_invest: '', signup_type: undefined, modelPortfolio: '',
                        } as Partial<User>}
                        validationSchema={validation}
                        onSubmit={this.confirmClickHandler}>
                        {({errors, values, handleChange, handleBlur, touched, handleSubmit}) => (
                            <View style={styles.container}>
                                <Select
                                    placeholder="Select Account Type"
                                    items={accountTypes}
                                    value={values.signup_type}
                                    onValueChange={handleChange('signup_type')}
                                    invalid={touched.signup_type && !!errors.signup_type}
                                    message={errors.signup_type}
                                    onDownArrow={() => this._textRefs[0].current.focus()}
                                    onDonePress={() => this._textRefs[0].current.focus()}
                                />
                                <FloatingTextInput
                                    label={'How much do you plan to invest upfront? (GBP)'}
                                    ref={this._textRefs[0]}
                                    style={[theme.mB2, theme.mT1]}
                                    keyboardType="decimal-pad"
                                    value={values.plan_to_invest}
                                    onChangeText={handleChange('plan_to_invest')}
                                    invalid={touched.plan_to_invest && !!errors.plan_to_invest}
                                    message={errors.plan_to_invest}
                                    onBlur={handleBlur('plan_to_invest')}
                                    returnKeyType="done"/>
                                <Select
                                    required
                                    placeholder="Select MarketsFlow Portfolio"
                                    items={modelPortfolio}
                                    pickerStyle={pickerStyle}
                                    invalid={touched.modelPortfolio && !!errors.modelPortfolio}
                                    message={errors.modelPortfolio}
                                    onValueChange={handleChange('modelPortfolio')}
                                    value={values.modelPortfolio}
                                />
                                <Button
                                    title={'Confirm'}
                                    style={[theme.button, {marginTop: '75%'}]}
                                    onPress={handleSubmit}>
                                </Button>
                                <Touchable
                                    onPress={() => Linking.canOpenURL(URLS.RISK_ADVISORY).then(supported => supported && Linking.openURL(URLS.RISK_ADVISORY))}>
                                    <Label fontSize={16} text={'or View detailed risk disclosure'}
                                           color={colors.primary}
                                           style={{alignSelf: 'center', margin: 10}}/>
                                </Touchable>
                            </View>)}
                    </Formik>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    subText: {margin: 10, textAlign: 'center'},
    input: {marginBottom: 5, borderWidth: 0.5, borderBottomWidth: 0.0, borderColor: colors.grey},
    logo: {margin: 10, marginTop: 30, marginBottom: 30, alignItems: 'center', alignSelf: 'center'},
    container: {
        padding: moderateScale(20),
    },
    imageView: {justifyContent: 'center', alignItems: 'center', margin: moderateScale(20)}
});
const pickerStyle = StyleSheet.create({
    inputIOS: theme.mB1,
    inputAndroid: theme.mB1,
})
