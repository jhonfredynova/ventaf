export const isHtml = value => {
  const regExpHtml = /<\/?[a-z][\s\S]*>/i;
  return regExpHtml.test(value);
};

export const copyToClipboard = text => {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const formatTag = tagName => {
  const response = tagName
    .trim()
    .replace(/ /g,'-')
    .replace(/[^a-z0-9-]/gi, '')
    .toLowerCase();

  return response;
};

export const formatTemplate = (template, data) => {
  let response = template;

  for (const key in data) {
    response = response.replace(new RegExp(`{${key}}`, 'g'), data[key]);
  }

  return response;
};

export const toSearchTerms = value => {
  const response = (value || '')
    .replace(/[,.;:]/gi, '')
    .toLowerCase()
    .trim()
    .split(' ');

  return response;
};

export const trimTextWithEllipsis = (text, maxLength) => {
	let trimmed = text;

	// The maxLength + 1 is for the case the last character is just before a space.
	// In that case we don't want to cut the text further
	if (trimmed.length > (maxLength + 1)) {
    trimmed = text
      .replace(/[\t\n\r]/gm,'')
      .substring(0, text.substr(0, maxLength).lastIndexOf(' '))
      .concat('...');
	}
	
	return trimmed;
};

export const toUrl = value => {
  let encodedUrl = value
    .toString()
    .trim()
    .toLowerCase();

  // replacing accents
  encodedUrl = encodedUrl.replace(new RegExp(/[àáâãäå]/g),'a');
  encodedUrl = encodedUrl.replace(new RegExp(/æ/g),'ae');
  encodedUrl = encodedUrl.replace(new RegExp(/ç/g),'c');
  encodedUrl = encodedUrl.replace(new RegExp(/[èéêë]/g),'e');
  encodedUrl = encodedUrl.replace(new RegExp(/[ìíîï]/g),'i');
  encodedUrl = encodedUrl.replace(new RegExp(/ñ/g),'n');                
  encodedUrl = encodedUrl.replace(new RegExp(/[òóôõö]/g),'o');
  encodedUrl = encodedUrl.replace(new RegExp(/œ/g),'oe');
  encodedUrl = encodedUrl.replace(new RegExp(/[ùúûü]/g),'u');
  encodedUrl = encodedUrl.replace(new RegExp(/[ýÿ]/g),'y');

  // replacing weird characteres with blank spaces and spaces with hyppens
  encodedUrl = encodedUrl.replace(/[^\w ]+/g, '');
  encodedUrl = encodedUrl.replace(/ +/g, '-');

  return encodedUrl;
};
