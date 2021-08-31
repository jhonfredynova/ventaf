import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import ProfileInfo from '../components/page-profile/profile-info';
import ProfileContents from '../components/page-profile/profile-contents';
import SEO from '../components/seo';
import { initializeStore } from '../store/store';
import { getConfiguration } from '../store/actions/config-actions';
import { getProfileByUsername, getProfileAds } from '../store/actions/profile-actions';

export const getServerSideProps = async ({ query }) => {
  try {
    const store = initializeStore();
    const profile = await store.dispatch(getProfileByUsername(query.username));

    await Promise.all([
      store.dispatch(getConfiguration()),
      store.dispatch(getProfileAds(profile.id, {}))
    ]);

    return { 
      props: {
        initialReduxState: store.getState() 
      }
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default function ProfileView() {
  const router = useRouter();
  const { username } = router.query;
  const authData = useSelector(state => state.auth.authData);
  const { translations } = useSelector(state => state.config);
  const profiles = useSelector(state => state.profile.records);
  const profileInfo = Object
    .keys(profiles)
    .map(profileId => profiles[profileId])
    .find(profile => profile.username === username);
  const pageTitle = (profileInfo && `${profileInfo.displayName} (@${profileInfo.username})`);
  const pageDescription = translations['slogan'];
  const ads = (profileInfo && profileInfo.ads || []);

  if (!profileInfo) {
    return null;
  }

  return (
    <main>
      <SEO
        title={pageTitle}
        description={pageDescription}>
      </SEO>
      <h1 className="sr-only">{pageTitle}</h1>
      <article className="sr-only">{pageDescription}</article>
      <ProfileInfo
        translations={translations}
        userProfile={profileInfo}>
      </ProfileInfo>
      <h2>{translations['ads']}</h2>
      <ProfileContents
        isLoading={false}
        authData={authData}
        posts={ads}
        translations={translations}
        userProfile={profileInfo}>
      </ProfileContents>
      <style jsx>{`
        main {
          padding: 15px;

          h2 {
            margin-bottom: 15px;
          }
        }
      `}</style>
    </main>
  );
}