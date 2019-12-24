import { Navigation } from 'react-native-navigation';
import { screens } from './screens';
import { withNavButton } from '../../HOCs/withNavButton';

export const registerScreens = () => {
	const screenConfigs = [
		{ screen: screens.AUTH.START, type: () => require('../../screens/Auth/Start/Start.screen').StartScreen },
		{
			screen: screens.AUTH.ForgotPassword,
			type: () => require('../../screens/Auth/ForgotPassword/ForgotPassword.screen').ForgotPasswordScreen
		},
		{
			screen: screens.AUTH.PasswordChanged,
			type: () => require('../../screens/Auth/PasswordChanged/PasswordChanged.screen').PasswordChangedScreen
		},
		{
			screen: screens.AUTH.ForgotPasswordCode,
			type: () =>
				require('../../screens/Auth/ForgotPasswordCode/ForgotPasswordCode.screen').ForgotPasswordCodeScreen
		},
		{
			screen: screens.AUTH.PasswordScreen,
			type: () => require('../../screens/Auth/PasswordScreen/Password.screen').PasswordScreen
		},
		{
			screen: screens.AUTH.REGISTER,
			type: () => require('../../screens/Auth/SignUp/PersonalDetails.screen').PersonalDetailsScreen
		},
		{ screen: screens.AUTH.LOGIN, type: () => require('../../screens/Auth/Login/Login.screen').LoginScreen },
		{
			screen: screens.AUTH.INVESTMENT_PLAN,
			type: () => withNavButton(require('../../screens/Auth/SignUp/InvestmentPlan.screen').InvestmentPlanScreen)
		},
		{ screen: screens.WELCOME, type: () => withNavButton(require('../../screens/Welcome.screen').WelcomeScreen) },
		{
			screen: screens.PersonalInformation,
			type: () => withNavButton(require('../../screens/PersonalInformation.screen').PersonalInformationScreen)
		},
		{
			screen: screens.EmploymentInformation,
			type: () => withNavButton(require('../../screens/EmploymentInformation.screen').EmploymentInformationScreen)
		},
		{
			screen: screens.FinancialInformation,
			type: () => withNavButton(require('../../screens/FinancialInformation.screen').FinancialInformationScreen)
		},
		{
			screen: screens.UserUpload,
			type: () => withNavButton(require('../../screens/UserUpload.screen').UserUploadScreen)
		},
		{ screen: screens.Payment, type: () => withNavButton(require('../../screens/Payment.screen').PaymentScreen) }
	];
	screenConfigs.forEach((p) => Navigation.registerComponent(p.screen.screen, p.type));
};
