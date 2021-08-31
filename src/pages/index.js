import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInfiniteQuery } from 'react-query';
import { useRouter } from 'next/router';
import { geocodeByPlaceId } from 'react-places-autocomplete';
import HomeFilters from '../components/page-home/home-filters';
import PostList from '../components/post-list';
import SEO from '../components/seo';
import { getPosts } from '../services/posts-service';
import { setUrlSearch } from '../utils/request-utils';
import { getHomePageTitle } from '../utils/seo-utils';
import { initializeStore } from '../store/store';
import { getConfiguration } from '../store/actions/config-actions';

export const getStaticProps = async () => {
  const store = initializeStore();
  await store.dispatch(getConfiguration());
  
  return {
    props: {
      initialReduxState: store.getState() 
    }
  };
};

export default function Home() {
  const [locationSelected, setLocationSelected] = useState({});
  const router = useRouter();
  const { query } = router;

  const {
    data: postPages,
    fetchNextPage: onLoadMorePosts,
    hasNextPage: hasMorePosts,
    isFetching: isLoadingPosts,
    isFetchingNextPage: isLoadingMorePosts
  } = useInfiniteQuery(['posts', query], 
    getPosts, 
    {
      getNextPageParam: lastPage => lastPage[lastPage.length - 1]?.createdAt,
      refetchOnWindowFocus: false
    }
  );

  const authData = useSelector(state => state.auth.authData);
  const { translations } = useSelector(state => state.config);
  const posts = postPages?.pages?.flatMap(page => page) || [];
  const pageTitle = getHomePageTitle({ query, translations });
  const pageDescription = translations['slogan'];

  useEffect(() => {
    if (!query.location) {
      setLocationSelected({});
      return;
    }
    geocodeByPlaceId(query.location)
      .then(location => {
        const locationInfo = {
          description: location[0].formatted_address,
          placeId: location[0].place_id
        };
        setLocationSelected(locationInfo);
      });
  }, [query.location]);

  return (
    <main>
      <SEO
        title={pageTitle}
        description={pageDescription}>
      </SEO>
      <h1 className="sr-only">{pageTitle}</h1>
      <article className="sr-only">{pageDescription}</article>
      <HomeFilters
        locationSelected={locationSelected}
        translations={translations}
        filters={query}
        onChange={query => router.push(`${router.pathname}${setUrlSearch(query)}`, undefined, { shallow: true })}>
      </HomeFilters>
      <PostList
        isLoading={isLoadingPosts}
        isLoadingMore={isLoadingMorePosts}
        hasMoreData={hasMorePosts}
        authData={authData}
        translations={translations}
        posts={posts}
        onLoadMore={onLoadMorePosts}>
      </PostList>
      <style jsx>{`
        main {
          min-height: 300px;
          padding: calc(var(--spacer) * 2);
        }  
      `}</style>
    </main>
  );

}
