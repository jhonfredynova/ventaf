import {
	getPosts as getPostsServ,
	getPostById as getPostByIdServ,
	getRelatedContent as getRelatedContentServ,
	createPost as createPostServ,
	updatePost as updatePostServ,
	updatePostViews as updatePostViewsServ,
	deletePost as deletePostServ,
} from '../../services/posts-service';

export const POST_TYPES = {
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
	const posts = await getPostsServ(filters);
	dispatch({ type: POST_TYPES.GET_ALL, payload: posts });
};

export const getMorePosts = (filters) => async (dispatch) => {
	const posts = await getPostsServ(filters);
	dispatch({ type: POST_TYPES.GET_MORE_POSTS, payload: posts });
	return posts;
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
		postData = await getPostByIdServ(postId);
	}

	dispatch({ type: POST_TYPES.GET_BY_ID, payload: postData });
	return postData;
};

export const getRelatedContent = (postId) => async (dispatch) => {
	const posts = await getRelatedContentServ(postId);
	dispatch({ type: POST_TYPES.GET_RELATED_CONTENT, payload: posts });
};

export const createPost = (postData) => async (dispatch) => {
	const response = await createPostServ(postData);
	dispatch({ type: POST_TYPES.CREATE, payload: response });
	return response;
};

export const updatePost = (postId, postData) => async (dispatch) => {
	const response = await updatePostServ(postId, postData);
	dispatch({ type: POST_TYPES.UPDATE, payload: response });
};

export const updatePostViews = (postId) => async (dispatch) => {
	const response = await updatePostViewsServ(postId);
	dispatch({ type: POST_TYPES.UPDATE_VIEWS, payload: response });
};

export const deletePost = (postId) => async (dispatch) => {
	const response = await deletePostServ(postId);
	dispatch({ type: POST_TYPES.DELETE, payload: response });
};
