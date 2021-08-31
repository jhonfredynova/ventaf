export const getPublicProfileData = userData => {
  return {
    id: userData.id,
    isEmailPublic: userData.isEmailPublic,
    displayName: userData.displayName,
    email: userData.email,
    bio: userData.bio,
    website: userData.website,
    photoURL: userData.photoURL,
    username: userData.username
  };
};

export const getUserProfileData = (userData, preferences) => {
  return { 
    createdAt: Date.now(),
    displayName: userData.displayName || userData.email.split('@')[0],
    ...(userData.photoURL && { photoURL: userData.photoURL }),
    username: userData.email,
    email: userData.email,
    marketer: userData.marketer || 'organic',
    preferences: {
      currency: preferences.currency || 'cop',
      dateFormat: preferences.dateFormat || 'dd/month/yyyy',
      language: preferences.language || 'es'
    }
  };
};

export const loadPreferences = (store, setPreferences) => {
  try {
    const { preferences: defaultPreferences, user } = store.getState();
    const userPreferences = user?.auth?.profile?.preferences;
    const localPreferences = {
      currency: localStorage.currency || defaultPreferences.currency,
      dateFormat: localStorage.dateFormat || defaultPreferences.dateFormat,
      language: localStorage.language || defaultPreferences.language
    };
    const preferences = {
      ...defaultPreferences, 
      ...localPreferences, 
      ...userPreferences
    };

    store.dispatch(setPreferences(preferences));
  } catch (error) {
    console.error('Error loading preferences', error);
  }
};

export const validateExistUserEmail = async (authLibrary, email) => {
  let emailExist = null;

  try {
    emailExist = await authLibrary.getUserByEmail(email);
  } catch (e) {
    emailExist = null;
  }

  return emailExist;
};