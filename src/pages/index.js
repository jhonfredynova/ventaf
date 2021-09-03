import React, { useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useRouter } from 'next/router';
import PostList from '../components/post-list';
import SEO from '../components/seo';
import { getHomePageTitle } from '../utils/seo-utils';
import { initializeStore } from '../store/store';
import { getConfiguration } from '../store/actions/config-actions';
import { getPosts, getMorePosts } from '../store/actions/post-actions';

export const getStaticProps = async ({ locale, query }) => {
  const store = initializeStore();
  
  await Promise.all([
    store.dispatch(getConfiguration(locale)),
    store.dispatch(getPosts(query))
  ]);
  
  return {
    props: {
      initialReduxState: store.getState() 
    }
  };
};

export default function Home() {
  const store = useStore();
  const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const router = useRouter();
  const { query } = router;
  const authData = useSelector(state => state.auth.authData);
  const posts = useSelector(state => state.post.records);
  const { translations } = useSelector(state => state.config);
  const pageTitle = getHomePageTitle({ query, translations });
  const pageDescription = translations['slogan'];

  const onLoadMorePosts = async () => {
    setIsLoadingMorePosts(true);
    const newPosts = await store.dispatch(getMorePosts(query));
    setHasMorePosts(newPosts.length > 0);
    setIsLoadingMorePosts(false);
  };

  return (
    <main>
      <SEO
        title={pageTitle}
        description={pageDescription}>
      </SEO>
      <h1 className="sr-only">{pageTitle}</h1>
      <article className="sr-only">{pageDescription}</article>
      <PostList
        isLoadingMore={isLoadingMorePosts}
        hasMoreData={hasMorePosts}
        authData={authData}
        translations={translations}
        posts={posts}
        onLoadMore={onLoadMorePosts}>
      </PostList>
      <style jsx>{`
        main {
          --container-width: 1200px;
          min-height: 300px;
          max-width: var(--container-width);
          margin: 0 auto;
          padding: calc(var(--spacer) * 2);
        }  
      `}</style>
    </main>
  );

}
