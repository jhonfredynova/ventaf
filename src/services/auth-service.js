import axios from 'axios';

export const loginOAuth = async (data) => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login-oauth`, data);
	return response.data;
};

export const getAuth = async () => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/me`);
	return response.data;
};

export const updateAuthData = async (data) => {
	const response = await axios.patch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/update?userId=${data.id}`,
		data
	);
	return response.data;
};

export const uploadAuthProfilePhoto = async (data) => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/upload-photo`, data);
	return response.data;
};
