import { ScreenConfig } from './screen.config';
import { colors } from '../../theme/variables';

export const refreshScreen = () => {
	return (screens = {
		AUTH: {
			START: {
				screen: 'START',
				title: 'START',
				navigatorStyle: ScreenConfig.NAV_HIDDEN
			},
			LOGIN: {
				screen: 'LOGIN',
				title: 'Sign In',
				navigatorStyle: ScreenConfig.TRANSPARENT_NAVBAR
			},
			ForgotPassword: {
				screen: 'Forgot Password',
				title: 'Forgot Password',
				navigatorStyle: ScreenConfig.TRANSPARENT_NAVBAR
			},
			ForgotPasswordCode: {
				screen: 'Forgot Password Code',
				title: 'Forgot Password',
				navigatorStyle: ScreenConfig.TRANSPARENT_NAVBAR
			},
			PasswordScreen: {
				screen: 'Password',
				title: 'Forgot Password',
				navigatorStyle: ScreenConfig.TRANSPARENT_NAVBAR
			},
			PasswordChanged: {
				screen: 'PasswordChanged',
				title: 'Forgot Password',
				navigatorStyle: ScreenConfig.TRANSPARENT_NAVBAR
			},
			REGISTER: {
				screen: 'REGISTER',
				title: 'Sign Up',
				navigatorStyle: ScreenConfig.TRANSPARENT_NAVBAR
			},
			INVESTMENT_PLAN: {
				screen: 'INVESTMENT_PLAN',
				title: 'Investment Plan',
				navigatorStyle: ScreenConfig.TRANSPARENT_NAVBAR
			}
		},
		WELCOME: {
			screen: 'WELCOME',
			title: 'Welcome to MarketsFlow',
			navigatorStyle: {
				...ScreenConfig.TRANSPARENT_NAVBAR,
				navBarBackgroundColor: colors.primaryDark,
				navBarButtonColor: colors.white,
				statusBarColor: colors.primaryDark,
				navBarTextColor: colors.white
			}
		},
		PersonalInformation: {
			screen: 'Personal Information',
			navigatorStyle: ScreenConfig.TRANSPARENT_NAVBAR
		},
		EmploymentInformation: {
			screen: 'Employment Information',
			navigatorStyle: ScreenConfig.TRANSPARENT_NAVBAR
		},
		FinancialInformation: {
			screen: 'Financial Information',
			navigatorStyle: ScreenConfig.TRANSPARENT_NAVBAR
		},
		UserUpload: {
			screen: 'User Upload',
			navigatorStyle: ScreenConfig.TRANSPARENT_NAVBAR
		},
		Payment: {
			screen: 'Payment',
			navigatorStyle: ScreenConfig.TRANSPARENT_NAVBAR
		}
	});
};
export let screens = refreshScreen();
