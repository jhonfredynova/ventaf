import jsonwebtoken from 'jsonwebtoken';

// eslint-disable-next-line import/prefer-default-export
export const createJsonWebToken = (userData, secretKey) => {
  const tokenPayload = {
    uid: userData.uid,
    claims: Object.keys(userData.customClaims),
    displayName: userData.displayName,
    email: userData.email,
    emailVerified: userData.emailVerified,
    providerData: userData.providerData,
  };
  const jwtToken = jsonwebtoken.sign(tokenPayload, secretKey, { expiresIn: '365d' }); // Valid for 365 days

  return jwtToken;
};