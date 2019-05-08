import { Navigation } from 'react-native-navigation';
import { refreshScreen, registerScreens, screens } from './index';
import { AsyncStorage } from "react-native";
import { User } from "../../models/user";

export const startApp = (screen?) => {
    refreshScreen();
    registerScreens();
    if (!screen) {
        screen = screens.AUTH.INVESTMENT_PLAN;
    }
    AsyncStorage.getItem('USER')
        .then(u => {
            let passProps = {title: ''};
            if (u) {
                const user: User = JSON.parse(u);
                if (user.plan_to_invest && +user.plan_to_invest < 25000) {
                    screen = screens.WELCOME;
                } else if (!user.plan_to_invest) {
                    screen = screens.AUTH.INVESTMENT_PLAN;
                } else if (!user.dob) {
                    screen = screens.PersonalInformation;
                } else if (!user.employment_type) {
                    screen = screens.EmploymentInformation;
                } else if (!user.net_worth) {
                    screen = screens.FinancialInformation;
                } else if (!user.utility_bill) {
                    screen = screens.UserUpload;
                } else {
                    screen = screens.WELCOME;
                }
                if (user.signup_type != null) {
                    if (user.signup_type === 1) {
                        passProps.title = 'Managed Portfolio'
                    } else {
                        passProps.title = 'Individual Savings Account (ISA)'
                    }
                }
            }
            Navigation.startSingleScreenApp({
                screen: screen,
                passProps,
                appStyle: {hideBackButtonTitle: true,},
                animationType: 'fade',
            })
        });
};
