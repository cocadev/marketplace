import React, { Component } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors, theme } from '../theme/variables';
import { NavigationComponentProps } from 'react-native-navigation';
import { Button, Container, Content, Label, Touchable } from "../components/UI";
import { screens } from "../config/navigation";
import ImagePicker from 'react-native-image-picker';
import { User } from "../models/user";
import { userUpload } from "../api/auth";
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import ImageResizer from 'react-native-image-resizer';

type Props = NavigationComponentProps & {
    user: Partial<User>,
    title: string;
};
type State = Partial<User> & {
    validations: any;
    isLoading?: boolean;
};

let ss = {};

export class UserUploadScreen extends Component<Props, any> {
    public state: any = {};
    public nextClickHandler = async () => {
        const {utility_bill, passport, passportName, utility_billName} = this.state;
        if (!utility_bill || !passport) {
            Alert.alert('Validation', 'Please select files.');
            return;
        }
        this.setState({isLoading: true});
        try {
            await userUpload({
                utility_bill,
                passport,
                passportName,
                utility_billName
            });
            const passProps = {title: this.props.title, user: {...this.props.user}};
            ss = {};
            this.props.navigator.push({...screens.WELCOME, passProps});
            this.setState({isLoading: false,});
        } catch (e) {
            this.setState({isLoading: false});
            console.log(e);
            Alert.alert('Error', 'Something went Wrong. Please try again.')
        }
        this.setState({isLoading: false});
    };

    public captureHandler = (key) => () => {
        ImagePicker.showImagePicker({noData: true, mediaType: 'photo'}, (response) => {
            if (!response.didCancel)
                ImageResizer.createResizedImage(response.uri, response.width, response.height, 'JPEG', 10,).then((img) => {
                    this.setState({[key]: img.uri, [key + 'Name']: response.fileName}, () => ss = this.state);
                }).catch((err) => {
                    console.log(err);
                    Alert.alert('Error', 'Something went Wrong. Please try again.');
                })
        });
    }

    componentWillMount(): void {
        this.setState(ss);
    }

    public render() {
        return (
            <Container isLoading={this.state.isLoading}>
                <Content>
                    <Label fontSize={16} text={'Please upload ID & Proof of Address'}
                           style={theme.infoTitle}/>
                    <Icon name="ios-cloud-upload" size={80} color={colors.primary} style={{alignSelf: 'center'}}/>
                    <View style={styles.container}>
                        <Label fontSize={12} text={'Capture ID'}
                               style={styles.inputLabel}/>
                        <Touchable
                            style={[styles.uploadButton, this.state.passport && styles.selected]}
                            onPress={this.captureHandler('passport')}>
                            <Label style={theme.mR1} text={'Browse'}
                                   color={this.state.passport ? colors.primary : colors.grey}/>
                            <MIcon name="vertical-align-top" size={20}
                                   color={this.state.passport ? colors.primary : colors.grey}
                            />
                        </Touchable>
                        {this.state.passportName && <Label fontSize={12} text={`File - ${this.state.passportName}`}
                                                           style={{alignSelf: 'flex-start'}} color={colors.greyDark}
                        />}

                        <Label fontSize={12} text={'Capture Proof of Address'}
                               style={styles.inputLabel}/>
                        <Touchable
                            style={[styles.uploadButton, this.state.utility_bill && styles.selected]}
                            onPress={this.captureHandler('utility_bill')}>
                            <Label style={theme.mR1} text="Browse"
                                   color={this.state.utility_bill ? colors.primary : colors.grey}/>
                            <MIcon name="vertical-align-top" size={20}
                                   color={this.state.utility_bill ? colors.primary : colors.grey}
                            />
                        </Touchable>
                        {this.state.utility_billName &&
                        <Label fontSize={12} text={`File - ${this.state.utility_billName}`}
                               style={{alignSelf: 'flex-start'}} color={colors.greyDark}
                        />}
                    </View>
                </Content>
                <Button
                    title={'Next'}
                    style={theme.button}
                    onPress={this.nextClickHandler}>
                </Button>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    subText: {margin: 10,},
    inputLabel: {
        paddingLeft: 0,
        marginBottom: 5,
        color: colors.primary,
        marginTop: moderateScale(20),
        alignSelf: 'flex-start',
    },
    selected: {borderColor: colors.primary,},
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1,
        padding: 15,
        backgroundColor: colors.transparent,
        elevation: 0,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: colors.grey,
        width: '100%'
    },
    container: {
        alignItems: 'center',
        padding: moderateScale(25),
    },
});

