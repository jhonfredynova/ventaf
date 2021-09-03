import React, { useState, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useRouter } from 'next/router';
import Authorization from '../../components/authorization';
import SEO from '../../components/seo';
import NavigationBar from '../../components/navigation-bar';
import FormPost from '../../components/page-post-edition/form-post';
import { getPostById, updatePost } from '../../store/actions/post-actions';
import { cleanProfile } from '../../store/actions/profile-actions';
import { initializeStore } from '../../store/store';
import { getConfiguration } from '../../store/actions/config-actions';
import { getFilesFromUrls } from '../../utils/upload-utils';

export const getServerSideProps = async ({ locale, query }) => {
  const store = initializeStore();
  const { postId } = query;

  await Promise.all([
    store.dispatch(getConfiguration(locale)),
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

const EditPost = () => {
  const store = useStore();
  const { authData } = useSelector(state => state.auth);
  const postData = useSelector(state => state.post.currentPost);
  const router = useRouter();

  const [isPosting, setIsPosting] = useState(false);
  const [changePhotos, setChangePhotos] = useState(false);
  const [errors, setErrors] = useState(false);
  const [model, setModel] = useState(postData);
  const { callingCodes, currencies, translations } = useSelector(state => state.config);

  const pageTitle = translations['adEditionTitle'];
  const pageDescription = translations['adEditionDescription'];

  useEffect(() => {
    const userPhone = authData?.profile?.phone;

    if (userPhone) {
      setModel({ ...model, seller: { ...model.seller, phone: userPhone } });
    }
  }, [authData]);

  useEffect(async () => {
    if (postData) {
      const filesData = await getFilesFromUrls(postData.photos);
      setModel({ ...model, photos: filesData });
    }
  }, [postData]);

  const onSavePost = async event => {
    try {
      if (event) {
        event.preventDefault();
      }

      // parsing post data
      setIsPosting(true);
      const { photos, ...modelData } = model;
      const postInfo = {
        ...modelData,
        seller: {
          ...model.seller,
          email: (authData && authData.email)
        },
        user: (authData && authData.uid)
      };

      // updating post info
      let formData = new FormData();
      formData.append('data', JSON.stringify(postInfo));

      if (changePhotos) {
        photos.forEach(file => formData.append('photos', file));
      }

      await store.dispatch(updatePost(postInfo.id, formData));
      
      // redirecting to the user ads
      await store.dispatch(cleanProfile(authData.uid));
      setIsPosting(false);
      router.push(`/${authData.profile.username}`);
    } catch (error) { 
      const { errors, code } = error?.response?.data || {};
      setIsPosting(false);
      setErrors({ ...errors, general: translations[code] });
    }
  };

  return (
    <main>
      <SEO
        title={pageTitle}
        description={pageDescription}>
      </SEO>
      <NavigationBar
        title={pageTitle}
        description={pageDescription}
        translations={translations}
        showBackBtn>
      </NavigationBar>
      <FormPost
        callingCodes={callingCodes}
        currencies={currencies}
        errors={errors}
        model={model}
        translations={translations}
        onChangePhotos={setChangePhotos}
        onChangeModel={setModel}
        onSavePost={onSavePost}>
      </FormPost>
      <div className="buttons-wrapper">
        <button 
          className="btn-post" 
          disabled={isPosting}
          onClick={onSavePost}>
          {
            isPosting && 
            <>
              <i className="fas fa-spinner fa-spin" title={translations.saving}></i>
              {translations['saving']}
            </>
          }
          {!isPosting && translations['update']}
        </button>
      </div>  
      <style jsx>{`
        main {
          max-width: var(--container-width);
          margin: 0 auto;
          padding: calc(var(--spacer) * 2);

          .buttons-wrapper {
            margin-top: calc(var(--spacer) * 2);
            text-align: right;

            .btn-post {
              background: var(--color-primary);
              border: none;
              color: white;
              cursor: pointer;
              padding: var(--spacer);

              .fa-spin {
                margin-right: 4px;
              }
            }
          }
        }    
      `}</style>
    </main>
  );

};

export default Authorization(EditPost, ['registered']);
