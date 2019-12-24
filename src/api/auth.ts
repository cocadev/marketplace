import Axios from 'axios';
import { URLS } from './URLS';
import { RegisterModel } from '../models/register.model';
import { LoginModel } from '../models/login.model';
import { ResetPassword } from '../models/resetPassword';
import { UserUpload } from '../models/userUpload';
import { User } from '../models/user';
import { AsyncStorage } from 'react-native';

const config = {
	timeout: 5000
};

const put = (url, data, options = {}) => {
	const abort = Axios.CancelToken.source();
	const id = setTimeout(() => abort.cancel(`Timeout of ${config.timeout}ms.`), config.timeout);
	return Axios.put(url, data, { cancelToken: abort.token, ...options }).then((response) => {
		clearTimeout(id);
		return response;
	});
};

const post = (url, data, options = {}) => {
	const abort = Axios.CancelToken.source();
	const id = setTimeout(() => abort.cancel(`Timeout of ${config.timeout}ms.`), config.timeout);
	return Axios.post(url, data, { cancelToken: abort.token, ...options }).then((response) => {
		clearTimeout(id);
		return response;
	});
};

export const register = (data: RegisterModel) => {
	return post(URLS.REGISTER, data);
};

export const login = (data: LoginModel) => {
	return post(URLS.LOGIN, data);
};
export const loginAdmin = () =>
	login({ username: 'lucas@marketsflow.com', password: 'UKengland10!' }).then(async (p) => {
		return p;
	});
export const logout = () => {
	return post(URLS.LOGOUT, {});
};
export const resetPassword = (data: ResetPassword) => {
	return post(URLS.RESET, data);
};
export const remindPassword = (email) => {
	return post(URLS.REMIND, email);
};
export const userUpload = async (data: UserUpload) => {
	const { id, token } = await getData();
	const formData = new FormData();
	formData.append('passport', { uri: data.passport, type: 'image/jpg', name: data.passportName });
	formData.append('utility_bill', { uri: data.utility_bill, type: 'image/jpg', name: data.utility_billName });
	return post(URLS.USER_UPLOAD.replace(':id', id), formData, {
		headers: { Authorization: 'Bearer ' + token }
	}).then(async (p) => {
		const user = await AsyncStorage.getItem('USER');
		if (user)
			await AsyncStorage.setItem(
				'USER',
				JSON.stringify({
					...JSON.parse(user),
					utility_bill: true,
					passport: true
				})
			);
		return p;
	});
};
export const userUpdate = async (user: User) => {
	const { id, token } = await getData();
	return put(URLS.USER_UPDATE.replace(':id', id), user, {
		headers: { Authorization: 'Bearer ' + token }
	}).then(async (p) => {
		await AsyncStorage.setItem('USER', JSON.stringify(p.data));
		return p;
	});
};
const getData = async () => {
	let admin = await loginAdmin();
	const token = admin.data.token;
	if (!token) {
		throw new Error('User not found');
	}
	const u = JSON.parse(await AsyncStorage.getItem('USER'));
	if (!u) {
		throw new Error('User not found');
	}
	const id = u.id;
	return { id, token };
};
