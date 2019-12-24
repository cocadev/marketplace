import { Navigation } from 'react-native-navigation';
import { refreshScreen, registerScreens, screens } from './index';
import { AsyncStorage } from 'react-native';

export const startAuth = (screen?) => {
	AsyncStorage.clear();
	refreshScreen();
	registerScreens();
	if (!screen) {
		screen = screens.AUTH.START;
	}
	Navigation.startSingleScreenApp({
		screen: screen,
		appStyle: { hideBackButtonTitle: true },
		animationType: 'fade'
	});
};
