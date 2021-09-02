import 'react-responsive-carousel/lib/styles/carousel.min.css';
import React, { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import PhotoCarousel from '../../components/page-post-details/photo-carousel';
import MainInfo from '../../components/page-post-details/main-info';
import ContactInfo from '../../components/page-post-details/contact-info';
import BreadcumbBar from '../../components/page-post-details/breadcumb-bar';
import SEO from '../../components/seo';
import PostList from '../../components/post-list';
import { getRelatedContent, getPostById, updatePostViews } from '../../store/actions/post-actions';
import { getProfileById } from '../../store/actions/profile-actions';
import { trimTextWithEllipsis } from '../../utils/text-utils';
import { BREAKPOINTS } from '../../utils/style-utils';
import { initializeStore } from '../../store/store';
import { getConfiguration } from '../../store/actions/config-actions';

export const getServerSideProps = async ({ query }) => {
  const store = initializeStore();
  const postId = query?.postParams?.[1];

  await Promise.all([
    store.dispatch(getConfiguration()),
    store.dispatch(getPostById(postId))
  ]);

  if (!store.getState().post.currentPost) {
    return {
      notFound: true
    };
  }
  
  return {
    props: {
      initialReduxState: store.getState() 
    }
  };
};

export default function PostDetails() {
  const store = useStore();
  const authData = useSelector(state => state.auth.authData);
  const { callingCodes, currencies, translations } = useSelector(state => state.config);
  const preferences = useSelector(state => state.preferences);
  const relatedContent = useSelector(state => state.post.relatedContent);
  const profiles = useSelector(state => state.profile.records);
  const postData = useSelector(state => state.post.currentPost);
  const userProfile = (postData && profiles[postData.user]);
  const pageTitle = trimTextWithEllipsis((postData && postData.description) || '', 100);

  useEffect(() => {
    store.dispatch(getProfileById(postData.user));
    store.dispatch(updatePostViews(postData.id));
    store.dispatch(getRelatedContent(postData.id));
  }, [postData]);

  return (
    <main>
      <SEO
        title={pageTitle}
        description={postData.description}>
      </SEO>
      <BreadcumbBar
        translations={translations}
        postData={postData}>
      </BreadcumbBar>
      <h1>{pageTitle}</h1>
      <section className="ad-details">
        <div className="main-details">
         <PhotoCarousel 
            autofocus
            bgColor="black"
            photos={postData.photos}>  
          </PhotoCarousel>
          <article>
            {postData.description}
          </article>
        </div>
        <div className="info">
          <MainInfo
            postData={postData}
            currencies={currencies}
            preferences={preferences}
            translations={translations}>
          </MainInfo>
          <ContactInfo
            postData={postData}
            callingCodes={callingCodes}
            pageTitle={pageTitle}
            translations={translations}
            userProfile={userProfile}>
          </ContactInfo>
        </div>
      </section>
      {
        relatedContent.length > 0 &&
        <section className="related-content">
          <h2>{translations['relatedContent']}</h2>
          <PostList
            isLoadingMore={false}
            hasMoreData={false}
            authData={authData}
            translations={translations}
            posts={relatedContent}
            onLoadMore={() => console.warn('loadMore')}>
          </PostList>
        </section>
      }
      <style jsx>{`
        main {
          max-width: var(--container-width);
          margin: 0 auto;
          padding: calc(var(--spacer) * 2);

          h1 {
            margin-bottom: var(--spacer);
          }

          .ad-details {
            display: flex;
            flex-direction: column;

            .main-details {
              margin-bottom: var(--spacer);

              article {
                margin-top: var(--spacer);
              }
            }

            .info {
              padding: var(--spacer);
              margin-bottom: var(--spacer);
            }

            @media screen and (min-width: ${BREAKPOINTS.DESKTOP}) {
              flex-direction: row;

              .photos {
                min-width: 70%;
              }
            }

          }

          .related-content {
            margin-top: var(--spacer);

            h2 {
              margin-bottom: var(--spacer);
            }
          }
        }  
      `}</style>
    </main>
  );
}