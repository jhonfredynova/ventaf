export const getDownload = (data, filename, contentType) => {
  const a = document.createElement('a');

  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = URL.createObjectURL(new Blob([data], { type: contentType || 'octet/stream' }));
  a.download = filename;
  a.click();
  a.remove();
  window.URL.revokeObjectURL(a.href);
};

export const setUrlSearch = filters => {
  let queryString = [];
  const queryKeys = Object
    .keys(filters || {})
    .filter(key => !['', null, undefined].includes(filters[key]));

  // eslint-disable-next-line no-restricted-syntax
  for (const key of queryKeys) {
    queryString = queryString.concat(`${key}=${filters[key]}`);
  }

  return `?${queryString.join('&')}`;
};