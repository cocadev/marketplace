import { startAuth } from "./config/navigation";
import { AsyncStorage } from "react-native";
import { startApp } from "./config/navigation/startApp";

const init = async () => {
    const user = await AsyncStorage.getItem('USER');
    if (user) {
        startApp();
    } else {
        startAuth();
    }
};
init();