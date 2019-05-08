import React, { Component } from 'react';
import { AsyncStorage, Image, Linking, StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors, images, theme } from '../theme/variables';
import { NavigationComponentProps } from 'react-native-navigation';
import { Container, Content, Label, Row, Touchable } from "../components/UI";
import { User } from "../models/user";
import { URLS } from "../api/URLS";

type Props = NavigationComponentProps & {
    user: Partial<User>
    type: string;
    title: string
};
type State = {
    validations: any;
    isLoading?: boolean;
};


export class WelcomeScreen extends Component<Props, any> {
    state: any = {};

    async componentDidMount() {
        const user = await AsyncStorage.getItem('USER');
        this.setState({user: JSON.parse(user)});
        this.props.navigator.setTitle({title: 'Welcome to MarketsFlow'})
    }

    public render() {
        return (
            <Container style={theme.greyBg}>
                <Content style={styles.container}>
                    {this.state.user && this.state.user.first_name &&
                    <View style={[styles.inputView, {alignItems: 'center'}]}>
                        <Row style={styles.logo}>
                            <Image source={images.greenLogo}/>
                            <Label fontSize={30} text={'MarketsFlow'} style={theme.m1} weight={"bold"}/>
                        </Row>
                        <Row style={{alignSelf: 'flex-start'}}>
                            <Label fontSize={14}
                                   text={`Dear `}
                                   color={colors.greyDark}/>
                            <Label fontSize={14}
                                   text={`${this.state.user.first_name} ${this.state.user.last_name}
                                   `}
                                   weight={"400"} color={colors.black}/>
                        </Row>
                        <Row style={{flexWrap: 'wrap', alignSelf: 'flex-start'}}>
                            <Label fontSize={14}
                                   color={colors.greyDark}>
                                Congratulations, your {this.props.title} number is {''}
                                <Text style={{color: colors.primary}}>{this.state.user.account}</Text>
                            </Label>
                        </Row>
                    </View>}
                    <View style={styles.inputView}>
                        <Text style={[styles.bottomText, {
                            margin: 0,
                            fontSize: 13,
                            textAlign: 'left',
                            alignSelf: 'flex-start',
                            color: colors.greyDark
                        }]}>
                            {`We are delighted that you have signed up with MarketsFlow, an FCA and SEC regulated
Investment Advisor and Manager.

Our Client services team will be reviewing your details and will get in touch with you to discuss the next steps.

In the meantime, you can reach us at `}
                            <Text style={{fontWeight: '500'}}>
                                support@marketsflow.com{' '}
                            </Text>
                            <Text>
                                with any questions regarding your account.
                            </Text>
                        </Text>
                        <Label fontSize={14}
                               text={``}
                               color={colors.greyDark}/>
                        <Label fontSize={18} text={'We will be in touch!'} color={colors.greyDark}
                               style={styles.mainText}/>
                    </View>
                    <Touchable
                        onPress={() => Linking.canOpenURL(URLS.RISK_ADVISORY).then(supported => supported && Linking.openURL(URLS.RISK_ADVISORY))}>
                        <Label fontSize={16} text={'View detailed risk disclosure'} color={colors.primary}
                               style={styles.bottomText}/>
                    </Touchable>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    title: {borderBottomColor: colors.grey, borderBottomWidth: 0.5},
    mainText: {textAlign: 'center', marginBottom: 10,},
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
    subText: {margin: 10,},
    bottomText: {margin: 10, textAlign: 'center'},
    inputView: {
        margin: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        padding: 15,
        alignSelf: 'center',
        width: '99%',
        backgroundColor: colors.white,
        borderRadius: 5
    },
    logo: {margin: 10, marginTop: 30, marginBottom: 30, alignItems: 'center', alignSelf: 'center'},
    button: {alignSelf: 'center', margin: moderateScale(10), width: '70%'},
    container: {
        padding: moderateScale(10),
        marginBottom: 10
    },
    imageView: {justifyContent: 'center', alignItems: 'center', margin: moderateScale(20)}
});
