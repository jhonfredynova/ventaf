import axios from 'axios';
import { setUrlSearch } from '../utils/request-utils';

export const getPosts = async (filters) => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/get-all${setUrlSearch(filters)}`
	);
	return response.data;
};

export const getPostById = async (postId) => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${postId}`);
	return response.data;
};

export const getRelatedContent = async (postId) => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/get-related-content?postId=${postId}`
	);
	return response.data;
};

export const createPost = async (postData) => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/create`, postData);
	return response.data;
};

export const updatePost = async (postId, postData) => {
	const response = await axios.patch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/update?postId=${postId}`,
		postData
	);
	return response.data;
};

export const updatePostViews = async (postId) => {
	const response = await axios.patch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/update-views?postId=${postId}`
	);
	return response.data;
};

export const deletePost = async (postId) => {
	const response = await axios.delete(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/remove?postId=${postId}`
	);
	return response.data;
};
