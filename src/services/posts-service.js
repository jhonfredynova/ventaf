import { setUrlSearch } from '../utils/request-utils';

export const getPosts = async ({ pageParam = null, queryKey }) => {
  const query = {
    ...queryKey[1],
    olderThan: pageParam
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/get-all${setUrlSearch(query)}`);
  const config = await response.json();

  return config;
};