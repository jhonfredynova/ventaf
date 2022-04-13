import axios from 'axios';
import { setUrlSearch } from '../../utils/request-utils';

export const TYPES = {
	CLEAN: 'CLEAN_POSTS',
	GET_ALL: 'GET_ALL_POSTS',
	GET_MORE_POSTS: 'GET_MORE_POSTS',
	GET_BY_ID: 'GET_POST_BY_ID',
	GET_RELATED_CONTENT: 'GET_RELATED_CONTENT',
	CREATE: 'CREATE_POST',
	UPDATE: 'UPDATE_POST',
	UPDATE_VIEWS: 'UPDATE_POST_VIEWS',
	DELETE: 'DELETE_POST',
};

export const getPosts = (filters) => async (dispatch) => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/get-all${setUrlSearch(filters)}`
	);
	dispatch({ type: TYPES.GET_ALL, payload: response.data });
};

export const getMorePosts = (query) => async (dispatch) => {
	const posts = await axios.get(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/get-all${setUrlSearch(query)}`
	);
	dispatch({ type: TYPES.GET_MORE_POSTS, payload: posts.data });
	return posts.data;
};

export const getPostById = (postId) => async (dispatch, getState) => {
	const { currentPost } = getState().post;
	const posts = getState().post.records;
	const profiles = getState().profile.records;
	const profilePosts = Object.keys(profiles).flatMap((profileId) => profiles[profileId].ads || []);
	const allPosts = posts
		.concat(profilePosts)
		.concat(currentPost)
		.filter((post) => post);
	let postData = allPosts.find((post) => post.id === postId);

	if (!postData) {
		postData = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${postId}`);
		postData = postData.data;
	}
	dispatch({ type: TYPES.GET_BY_ID, payload: postData });
	return postData;
};

export const getRelatedContent = (postId) => async (dispatch) => {
	const posts = await axios.get(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/get-related-content?postId=${postId}`
	);
	dispatch({ type: TYPES.GET_RELATED_CONTENT, payload: posts.data });
};

export const createPost = (postData) => async (dispatch) => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/create`, postData);
	dispatch({ type: TYPES.CREATE, payload: response.data });
	return response.data;
};

export const updatePost = (postId, postData) => async (dispatch) => {
	const response = await axios.patch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/update?postId=${postId}`,
		postData
	);
	dispatch({ type: TYPES.UPDATE, payload: response.data });
};

export const updatePostViews = (postId) => async (dispatch) => {
	const response = await axios.patch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/update-views?postId=${postId}`
	);
	dispatch({ type: TYPES.UPDATE_VIEWS, payload: response.data });
};

export const deletePost = (postId) => async (dispatch) => {
	const response = await axios.delete(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/remove?postId=${postId}`
	);
	dispatch({ type: TYPES.DELETE, payload: response.data });
};
