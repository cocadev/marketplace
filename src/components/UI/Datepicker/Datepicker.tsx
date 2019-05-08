import React, { Component } from 'react';
import {
    Animated,
    DatePickerAndroid,
    DatePickerIOS,
    Image,
    ImageStyle,
    Modal,
    Platform,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle
} from 'react-native';
import { colors } from '../../../theme/variables';
import { Label, Touchable } from '..';
import moment from 'moment';


interface Props {
    value?: Date | string;
    color?: string;
    required?: boolean;
    uri?: string;
    iconSize?: number;
    format?: string;
    showFormat?: boolean;
    maxDate?: Date,
    minDate?: Date,
    message?,
    invalid?,
    placeholder?,
    mode?: 'calendar' | 'spinner' | 'default';
    onSelect: (val: Date, dateString: string) => any;
    textStyle?: TextStyle;
    iconStyle?: ImageStyle;
    cancelBtnText?: string,
    confirmBtnText?: string,
    style?: StyleProp<ViewStyle>
}

export class DatePicker extends Component<Props, any> {
    public static defaultProps: Props = {
        onSelect: null,
        color: colors.black,
        iconSize: 24,
        format: 'DD MMMM, YYYY',
        cancelBtnText: 'Cancel',
        confirmBtnText: 'Done',
    };
    public state = {
        dateString: '',
        date: new Date(),
        modalVisible: false,
        animatedHeight: new Animated.Value(0),
        allowPointerEvents: true
    };

    public componentWillReceiveProps(props: Props) {
        if (props.value) {
            this.setState({dateString: this.parseValue(props.value)});
        }
    }

    public componentDidMount() {
        this.setState({dateString: this.parseValue(this.props.value)});
    }

    public parseValue = (value: Date | string) => {
        let dateString;
        if (value) {
            if (typeof value === 'string') {
                dateString = value;
                this.setState({date: moment(value, this.props.format).toDate()});
            } else {
                this.setState({date: value});
                dateString = moment(value).format(this.props.format);
            }
        } else if (this.props.showFormat) {
            dateString = this.props.format;
        }
        return dateString;
    };
    public dateClickHandler = async () => {
        if (Platform.OS === 'ios') {
            this.setModalVisible(true);
        } else {
            // @ts-ignore
            const {action, year, month, day} = await DatePickerAndroid.open({
                maxDate: this.props.maxDate,
                minDate: this.props.minDate,
                date: this.state.date,
                mode: this.props.mode,
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const date = new Date(year, month, day);
                const dateString = moment(date).format(this.props.format);
                this.setState({dateString, date});
                this.props.onSelect(date, dateString);
            }
        }

    };

    setModalVisible = (visible) => {
        const height = 259, duration = 300;

        // slide animation
        if (visible) {
            this.setState({modalVisible: visible});
            return Animated.timing(
                this.state.animatedHeight,
                {
                    toValue: height,
                    duration: duration
                }
            ).start();
        } else {
            return Animated.timing(
                this.state.animatedHeight,
                {
                    toValue: 0,
                    duration: duration
                }
            ).start(() => {
                this.setState({modalVisible: visible});
            });
        }
    }

    onDateChange = (date) => {
        const dateString = moment(date).format(this.props.format);
        this.setState({dateString, date, allowPointerEvents: false,});
        const timeoutId = setTimeout(() => {
            this.setState({allowPointerEvents: true});
            clearTimeout(timeoutId);
        }, 200);
    }

    onPressCancel = () => {
        this.setModalVisible(false);
    }

    onPressConfirm = () => {
        this.props.onSelect(this.state.date, this.state.dateString);
        this.setModalVisible(false);
    }

    public render() {
        const {
            minDate,
            maxDate,
            cancelBtnText,
            confirmBtnText,
        } = this.props;

        return (
            <React.Fragment>
                {Platform.OS === 'ios' && <Modal
                    transparent={true}
                    animationType="none"
                    visible={this.state.modalVisible}
                    // supportedOrientations={SUPPORTED_ORIENTATIONS}
                    onRequestClose={() => {
                        this.setModalVisible(false);
                    }}>
                    <View style={{flex: 1}}>
                        <Touchable
                            style={styles.datePickerMask}>
                            <Touchable style={{flex: 1}}>
                                <Animated.View
                                    style={[styles.datePickerCon, {height: this.state.animatedHeight}]}>
                                    <View pointerEvents={this.state.allowPointerEvents ? 'auto' : 'none'}>
                                        <DatePickerIOS
                                            date={this.state.date}
                                            mode={"date"}
                                            minimumDate={minDate}
                                            maximumDate={maxDate}
                                            onDateChange={this.onDateChange}
                                            minuteInterval={1}
                                            style={[styles.datePicker]}
                                            // locale={locale}
                                        />
                                    </View>
                                    <Touchable
                                        onPress={this.onPressCancel}
                                        style={[styles.btnText, styles.btnCancel]}>
                                        <Label style={[styles.btnTextText, styles.btnTextCancel]}>
                                            {cancelBtnText}
                                        </Label>
                                    </Touchable>
                                    <Touchable
                                        onPress={this.onPressConfirm}
                                        style={[styles.btnText, styles.btnConfirm]}>
                                        <Label style={[styles.btnTextText]}>
                                            {confirmBtnText}
                                        </Label>
                                    </Touchable>
                                </Animated.View>
                            </Touchable>
                        </Touchable>
                    </View>
                </Modal>}
                <Touchable onPress={this.dateClickHandler} style={[styles.inputContainer, this.props.style]}>
                    <View style={styles.label}>
                        {this.props.placeholder && <Label color={colors.black}
                                                          style={{
                                                              left: 0,
                                                              top: !this.state.dateString ? 15 : -5,
                                                              fontSize: !this.state.dateString ? 14 : 12,
                                                              color: !this.state.dateString ? colors.grey : colors.primary,
                                                          }}>{this.props.placeholder} {this.props.required && <Text
                            style={{color: !this.state.dateString ? colors.red : colors.primary}}>*</Text>}</Label>}
                        <Label color={colors.black}
                               opacity={this.state.dateString === this.props.format ? 'secondary' : 'primary'}
                               style={this.props.textStyle}>
                            {this.state.dateString}
                        </Label>
                    </View>
                    {this.props.uri && <Image source={{uri: this.props.uri}}
                                              style={this.props.iconStyle}/>}

                </Touchable>
                {this.props.invalid && <Label color={colors.red} size={'s'} text={this.props.message}/>}
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        paddingLeft: 0,
        padding:5,
        borderColor: colors.grey
    },
    label: {
        // height: 25,
        padding: 10,
        paddingLeft: 0,
    },
    dateTouch: {
        width: 142
    },
    dateTouchBody: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateIcon: {
        width: 32,
        height: 32,
        marginLeft: 5,
        marginRight: 5
    },
    dateInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#aaa',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateText: {
        color: '#333'
    },
    placeholderText: {
        color: '#c9c9c9'
    },
    datePickerMask: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        backgroundColor: '#00000077'
    },
    datePickerCon: {
        backgroundColor: '#fff',
        height: 0,
        overflow: 'hidden'
    },
    btnText: {
        position: 'absolute',
        top: 0,
        height: 42,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTextText: {
        fontSize: 16,
        color: colors.primary
    },
    btnTextCancel: {
        color: '#666'
    },
    btnCancel: {
        left: 0
    },
    btnConfirm: {
        right: 0
    },
    datePicker: {
        marginTop: 42,
        borderTopColor: '#ccc',
        borderTopWidth: 1
    },
    disabled: {
        backgroundColor: '#eee'
    }
});
