import React, { useState, useEffect, useRef } from 'react';
import ReactGA from 'react-ga';
import { useSelector, useStore } from 'react-redux';
import { useRouter } from 'next/router';
import UserLogin from '../../components/user-login/user-login';
import SEO from '../../components/seo';
import NavigationBar from '../../components/navigation-bar';
import FormPost from '../../components/page-post-edition/form-post';
import Lighbox from '../../components/lightbox';
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
  const [showModalUser, setShowModalUser] = useState(false);
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
  const { authData, authLoaded } = useSelector(state => state.auth);  
  const { callingCodes, currencies, translations } = useSelector(state => state.config);
  
  const pageTitle = translations['sellNowTitle'];
  const pageDescription = translations['sellNowDescription'];

  const onChangeModel = newModel => {
    changedData.current = true;
    setModel(newModel);
  };

  const onLeavePage = event => {
    if (changedData.current) {
      event.preventDefault();
      event.returnValue = '';
      return;
    }
  };

  const onLeaveRoute = () => {
    if (!changedData.current) { 
      return;
    }
    if (window.confirm(translations['areYouSureLeavePage?'])) {
      return;
    }
    router.events.emit('routeChangeError');
    throw 'routeChange aborted.';
  };

  const onSavePost = async event => {
    try {
      if (event) {
        event.preventDefault();
      }

      if (!authData) {
        ReactGA.event({
          category: 'Users',
          action: 'Login modal before create post',
          value: 3
        });
        setShowModalUser(true);
        return;
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

      // create post
      let formData = new FormData();
      formData.append('data', JSON.stringify(postInfo));
      photos.forEach(file => formData.append('photos', file));
      await store.dispatch(createPost(formData));
      
      // redirecting to the user ads
      setIsPosting(false);
      changedData.current = false;
      router.push(`/${authData.profile.username}`);
    } catch (error) { 
      const { errors, code } = error?.response?.data || {};
      setIsPosting(false);
      setErrors({ ...errors, general: translations[code] });
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onLeavePage);
    router.events.on('routeChangeStart', onLeaveRoute);

    return () => {
      window.removeEventListener('beforeunload', onLeavePage);
      router.events.off('routeChangeStart', onLeaveRoute);
    };
  }, [changedData]);

  useEffect(() => {
    const userPhone = authData?.profile?.phone;
    if (userPhone) {
      setModel({ ...model, seller: { ...model.seller, phone: userPhone } });
    }
  }, [authData]);

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
        onChangeModel={onChangeModel}
        onSavePost={onSavePost}>
      </FormPost>
      {
        authLoaded &&
        <div className="buttons-wrapper">
          <button 
            className="btn-post" 
            disabled={isPosting}
            onClick={onSavePost}>
            {
              isPosting && 
              <>
                <i className="fas fa-spinner fa-spin" title={translations['saving']}></i>
                {translations['saving']}
              </>
            }
            {!isPosting && !authData && translations['login']}
            {!isPosting && authData && translations['postNow']}
          </button>
        </div>  
      }
      <Lighbox
        isOpen={showModalUser}
        onToggle={() => setShowModalUser(!showModalUser)}>
        <div className="lightbox-login">
          <h2>{translations['login']}</h2>
          <UserLogin
            translations={translations}
            onLoginSuccess={() => setShowModalUser(false)}>
          </UserLogin>
        </div>
      </Lighbox>
      <style jsx>{`
        main {
          --container-width: 900px;
          max-width: var(--container-width);
          margin: 0 auto;
          padding: calc(var(--spacer) * 2);

          .buttons-wrapper {
            margin-top: calc(var(--spacer) * 2);
            text-align: right;

            .btn-post {
              background: var(--color-primary);
              border: 1px solid var(--border-color);
              border-radius: var(--border-radius);
              color: white;
              cursor: pointer;
              padding: var(--spacer);

              &:disabled {
                background-color: var(--color-secondary);
                color: var(--color-text);
                cursor: default;
              }

              .fa-spin {
                margin-right: 4px;
              }
            }
          }

          .lightbox-login {
            h2 {
              margin-bottom: var(--spacer);
            }
          }
        }    
      `}</style>
    </main>
  );

}
