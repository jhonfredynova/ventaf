import axios from 'axios';

export const getProfileByEmail = async (email) => {
	const response = await axios.post(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/profiles/get-profile-by-email?email=${email}`
	);
	return response.data;
};

export const getProfileById = async (userId) => {
	const response = await axios.post(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/profiles/get-profile-by-id?userId=${userId}`
	);
	return response.data;
};

export const getProfileByUsername = async (username) => {
	const response = await axios.post(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/profiles/get-profile-by-username?username=${username}`
	);
	return response.data;
};
