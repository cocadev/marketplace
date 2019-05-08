import React, { Component } from 'react';
import { NavigationComponentProps } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../theme/variables';
import { logout } from "../api/auth";
import { Alert, AsyncStorage } from "react-native";
import { screens } from "../config/navigation";

export function withNavButton(WrappedComponent) {
    return class extends Component<NavigationComponentProps & { title }, any> {
        constructor(props) {
            super(props);
            Icon.getImageSource('md-log-out', 25, colors.white)
                .then(icon => this.props.navigator.setButtons({
                    rightButtons: [{id: 'logout', icon,}]
                }));
            if (this.props.title) {
                this.props.navigator.setTitle({title: this.props.title})
            }
            this.props.navigator.setOnNavigatorEvent(e => {
                if (e.id === 'logout') {
                    Alert.alert('Logout', 'Are you sure you want to logout ?', [{
                        style: "destructive",
                        text: 'Yes',
                        onPress: this.logout
                    }, {style: "destructive", text: 'No',},]);
                }
            })
        }

        logout = () => {
            const reset = () => {
                AsyncStorage.clear()
                    .then(p => this.props.navigator.resetTo(screens.AUTH.START));
            };
            logout()
                .then(reset)
                .catch(reset);
        }

        render() {
            return (
                <WrappedComponent {...this.props} />
            );
        };
    }
}
