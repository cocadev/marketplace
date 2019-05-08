import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors, theme } from '../theme/variables';
import { NavigationComponentProps } from 'react-native-navigation';
import { Button, Container, Content, Input, Label, Row } from "../components/UI";
import { screens } from "../config/navigation";
import { User } from "../models/user";
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';

type Props = NavigationComponentProps & {
    user: Partial<User>,
    title: string;
};
type State = Partial<User> & {
    validations: any;
    isLoading?: boolean;
};

let state = {};

export class PaymentScreen extends Component<Props, any> {
    public state: any = {};
    public nextClickHandler = async () => {
        state = {};
        this.props.navigator.push({...screens.WELCOME, passProps: {title: this.props.title}})
    };

    public inputHandler = (key) => (value) => {
        // @ts-ignore
        this.setState({[key]: value})
    }

    componentWillMount(): void {
        this.setState(state);
    }

    componentWillUnmount(): void {
        state = this.state;
    }

    async componentDidMount() {
        const user = await AsyncStorage.getItem('USER');
        this.setState(s => ({amount: s.amount || JSON.parse(user).plan_to_invest}));
    }

    public render() {
        return (
            <Container isLoading={this.state.isLoading} style={{backgroundColor: colors.bgGrey}}>
                <Content>
                    <View style={styles.container}>
                        <Label fontSize={16} text={'Proceed to Payment'}
                               style={theme.infoTitle}/>
                        <View style={[styles.inputView, styles.center]}>
                            <Label fontSize={12} text={'Enter amount to Transfer'} color={colors.grey}/>
                            <Row style={{alignItems: 'center', marginTop: 10,}}>
                                <Label fontSize={16} style={{position: 'absolute', zIndex: 999, left: 15}} text={'GBP'}
                                       color={colors.grey}/>
                                <Input
                                    textStyle={styles.text}
                                    style={styles.textView}
                                    value={this.state.amount}
                                    onChangeText={this.inputHandler('amount')}
                                    keyboardType={"decimal-pad"}
                                    returnKeyType="done"/>
                            </Row>
                        </View>
                        <Label fontSize={16} text={'Bank payment transfer details'}
                               style={theme.infoTitle}/>
                        <View style={styles.inputView}>
                            <Row style={[styles.border, styles.row]}>
                                <Icon style={{width: 30, alignSelf: 'center'}} name="ios-swap" size={20}
                                      color={colors.grey}/>
                                <Label fontSize={12} text={'Transfer To'} style={styles.label}/>
                                <Label fontSize={13} text={'MarketFlow Limited'} weight="400"
                                       style={[styles.label, {marginLeft: 'auto', color: colors.black}]}/>
                            </Row>
                            <Row style={[styles.border, styles.row]}>
                                <MIcon name="format-line-spacing" style={{width: 30, alignSelf: 'center'}} size={20}
                                       color={colors}/>
                                <Label fontSize={12} text={'UK Sort Code'}
                                       style={styles.label}/>
                            </Row>
                            <Row style={[styles.border, styles.row]}>
                                <MIcon style={{width: 30, alignSelf: 'center'}} name="person-outline" size={20}
                                       color={colors.grey}/>
                                <Label fontSize={12} text={'Account Number'}
                                       style={styles.label}/>
                            </Row>
                            <Row style={[styles.border, styles.row]}>
                                <Icon style={{width: 30, alignSelf: 'center'}} name="md-keypad" size={20}
                                      color={colors.grey}/>
                                <Label fontSize={12} text={'Reference Number'} style={styles.label}/>
                            </Row>
                            <Row style={styles.row}>
                                <MIcon style={{width: 30, alignSelf: 'center'}} name="account-balance" size={20}
                                       color={colors.grey}/>
                                <Label fontSize={12} text={'Bank Number'} style={styles.label}/>
                            </Row>
                        </View>
                        <Label fontSize={16} text={'For International Transfers'}
                               style={theme.infoTitle}/>
                        <View style={styles.inputView}>
                            <Row style={[styles.border, styles.row]}>
                                <MIcon style={{width: 30, alignSelf: 'center'}} name="person-outline" size={20}
                                       color={colors.grey}/>
                                <Label fontSize={12} text={'IBAN'} style={styles.label}/>
                            </Row>
                            <Row style={styles.row}>
                                <Icon style={{width: 30, alignSelf: 'center'}} name="md-keypad" size={20}
                                      color={colors.grey}/>
                                <Label fontSize={12} text={'SWIFT/BPC Code'} style={styles.label}/>
                            </Row>
                        </View>
                        <Label fontSize={12}
                               text={`Kindly proceed to your online banking app to transfer the exact above amount. Confirm by clicking below once the transfer has been made so we can verify.`}
                               style={styles.label}/>
                        <Button
                            title={'I made this transfer'}
                            style={styles.button}
                            onPress={this.nextClickHandler}>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    textView: {
        alignSelf: 'center',
        paddingLeft: 40,
        width: moderateScale(150),
        height: moderateScale(40),
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: colors.grey,
        backgroundColor: colors.bgGrey
    },
    text: {
        alignSelf: 'center',
        borderBottomWidth: 0,
        fontSize: 18
    },
    center: {
        alignItems: 'center',
    },
    inputView: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        padding: 20,
        alignSelf: 'center',
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 5
    },
    row: {paddingBottom: 8, alignItems: 'center'},
    border: {borderBottomWidth: 0.5, paddingBottom: 8, borderColor: colors.grey,},
    title: {borderBottomColor: colors.grey, borderBottomWidth: 0.5},
    subText: {margin: 10,},
    input: {marginBottom: 5, borderWidth: 0.5, borderBottomWidth: 0, borderColor: colors.grey},
    label: {
        padding: 10,
        paddingLeft: 0,
        paddingBottom: 5,
        color: colors.greyDark,
    },
    inputLabel: {
        padding: 10,
        paddingLeft: 0,
        marginBottom: 5,
        color: colors.grey,
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
    button: {alignSelf: 'center', margin: moderateScale(10), width: '80%'},
    container: {
        padding: moderateScale(10),
    },
    imageView: {justifyContent: 'center', alignItems: 'center', margin: moderateScale(20)}
});

const pickerStyle = StyleSheet.create({
    inputIOS: {
        borderColor: colors.grey,
        borderWidth: 1,
    },
    inputAndroid: {
        borderColor: colors.grey,
        borderWidth: 1,
    },
})