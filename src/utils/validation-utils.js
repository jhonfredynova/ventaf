export const isEmail = value => {
  const regExpEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  return regExpEmail.test(value);
};

export const isUrl = value => {
  const pattern = /(http|https):\/\/[\w\-_:@]+(\.[\w\-_]+)+([\w\-.,@?^=%&amp;:/~+#]*[\w\-@?^=%&amp;/~+#])?/i;

  return pattern.test(value);
};