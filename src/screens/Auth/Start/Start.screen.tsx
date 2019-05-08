import React, { Component } from 'react';
import { Image, ImageBackground, Linking, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { NavigationComponentProps } from 'react-native-navigation';
import { Button, Container, Content, Label, Row, Touchable } from "../../../components/UI";
import { colors, images, theme } from "../../../theme/variables";
import { screens } from "../../../config/navigation";
import { URLS } from "../../../api/URLS";

type Props = NavigationComponentProps & {};

export class StartScreen extends Component<Props, any> {
    public state: any = {};
    public signupClickHandler = () => {
        this.props.navigator.push(screens.AUTH.REGISTER);
    }
    public loginClickHandler = () => {
        this.props.navigator.push(screens.AUTH.LOGIN);
    }

    public render() {
        return (
            <Container isLoading={this.state.isLoading} style={{paddingTop: 0}}>
                <Content style={{backgroundColor: 'transparent'}}>
                    <ImageBackground source={images.landing} style={{height: '100%', width: '100%'}}
                                     imageStyle={{resizeMode: 'cover'}}>
                        <View style={styles.container}>
                            <Label fontSize={14} text={'INTELLIGENT \n INVESTMENT MANAGEMENT'}
                                   color={colors.greyDark}
                                   style={styles.mainText}/>
                            <Row style={styles.logo}>
                                <Image source={images.greenLogo}/>
                                <Label fontSize={30} text={'MarketsFlow'} style={theme.m1} weight={"bold"}/>
                            </Row>
                            <Label fontSize={18} text={'Let your money grow'} color={colors.greyDark}
                                   style={[styles.subText, {marginBottom: '40%'}]}/>
                            <Button
                                title={'Login'}
                                style={styles.button}
                                onPress={this.loginClickHandler}>
                            </Button>
                            <Button
                                title={'Sign Up'}
                                style={styles.button}
                                onPress={this.signupClickHandler}>
                            </Button>
                            <Touchable
                                onPress={() => Linking.canOpenURL(URLS.DISCOVER_MORE).then(supported => supported && Linking.openURL(URLS.DISCOVER_MORE))}>
                                <Label fontSize={16} text={'Discover more'} color={colors.primary}
                                       style={styles.subText}/>
                            </Touchable>

                        </View>
                        <View style={theme.center}>
                            <Label fontSize={12}
                                   text={'Authorised and regulated by the Financial\nConduct Authority (FCA No. 792373)'}
                                   color={colors.grey} style={styles.subText}/>
                            <Label fontSize={12} text={'\u00A9 Copyright 2019 MarketsFlow'} color={colors.grey}
                                   style={styles.subText}/>
                        </View>
                    </ImageBackground>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    button: {alignSelf: 'center', margin: moderateScale(10), width: '90%'},
    logo: {alignItems: 'center'},
    subText: {margin: 10, textAlign: 'center'},
    mainText: {textAlign: 'center', marginTop: 50, marginBottom: 40, margin: 10},
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: moderateScale(20),
    },
    imageView: {justifyContent: 'center', alignItems: 'center', margin: moderateScale(20)}
});

