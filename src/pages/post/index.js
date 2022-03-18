import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useRouter } from 'next/router';
import SEO from '../../components/seo';
import NavigationBar from '../../components/navigation-bar';
import FormPost from '../../components/page-post-edition/form-post';
import { createPost } from '../../store/actions/post-actions';
import { initializeStore } from '../../store/store';
import { getConfiguration } from '../../store/actions/config-actions';

export const getStaticProps = async ({ locale }) => {
  const store = initializeStore();
  await store.dispatch(getConfiguration(locale));
  
  return {
    props: {
      initialReduxState: store.getState() 
    }
  };
};

export default function NewPost() { 
  const router = useRouter();
  const store = useStore();
  const changedData = useRef(false);
  const [isPosting, setIsPosting] = useState(false);
  const [errors, setErrors] = useState(false);
  const [model, setModel] = useState({
    price: {
      currency: 'cop',
      value: ''
    },
    description: '',
    location: {},
    photos: [],
    tags: [],
    seller: {
      email: '',
      phone: {
        prefix: '+57',
        number: ''
      }
    },
    user: null
  });
  const { authData } = useSelector(state => state.auth);  
  const { callingCodes, currencies, translations } = useSelector(state => state.config);
  
  const pageTitle = translations.sellNowTitle;
  const pageDescription = translations.sellNowDescription;

  const onChangeModel = newModel => {
    changedData.current = true;
    setModel(newModel);
  };

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
        user: authData?.uid
      };

      // create post
      const formData = new FormData();
      formData.append('data', JSON.stringify(postInfo));
      photos.forEach(file => formData.append('photos', file));
      await store.dispatch(createPost(formData));
      
      // redirecting to the user ads
      setIsPosting(false);
      changedData.current = false;
      router.push('/');
    } catch (error) { 
      const { errors: serverErrors, code, message } = error?.response?.data || {};
      setIsPosting(false);
      setErrors({ ...serverErrors, general: (translations[code] || message) });
    }
  };

  useEffect(() => {
    const onLeavePage = event => {
      if (changedData.current) {
        event.preventDefault();
        // eslint-disable-next-line no-param-reassign
        event.returnValue = ''; 
      }
    };
  
    const onLeaveRoute = () => {
      if (!changedData.current) { 
        return;
      }
      // eslint-disable-next-line no-alert
      if (window.confirm(translations['areYouSureLeavePage?'])) {
        return;
      }
      router.events.emit('routeChangeError');
      // eslint-disable-next-line no-throw-literal
      throw 'routeChange aborted.';
    };

    window.addEventListener('beforeunload', onLeavePage);
    router.events.on('routeChangeStart', onLeaveRoute);

    return () => {
      window.removeEventListener('beforeunload', onLeavePage);
      router.events.off('routeChangeStart', onLeaveRoute);
    };
  }, [changedData, router.events, translations]);

  useEffect(() => {
    const userPhone = authData?.profile?.phone;

    if (userPhone && !model.seller.phone) {
      setModel({ ...model, seller: { ...model.seller, phone: userPhone } });
    }
  }, [authData, model]);

  return (
    <main>
      <SEO
        title={pageTitle}
        description={pageDescription} />
      <NavigationBar
        title={pageTitle}
        description={pageDescription}
        translations={translations}
        showBackBtn />
      <FormPost
        isPosting={isPosting}
        btnLabel={translations.post}
        callingCodes={callingCodes}
        currencies={currencies}
        errors={errors}
        model={model}
        translations={translations}
        onChangeModel={onChangeModel}
        onSavePost={onSavePost} />  
      <style jsx>{`
        main {
          max-width: var(--container-width);
          margin: 0 auto;
          padding: calc(var(--spacer) * 2);
          .lightbox-login {
            background-color: var(--color-background);
            border-radius: var(--spacer);
            text-align: center;
            padding: var(--spacer);
            max-width: 100%;
            max-width: 100%;
            width: 500px;

            h2 {
              margin-bottom: var(--spacer);
            }
          }
        }    
      `}</style>
    </main>
  );

}
