import { getDbQuery } from './database-utils';
import config from '../../config.json';

export const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export const formatDate = (datetime, format) => {
	const date = new Date(datetime);
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	const miliseconds = date.getMilliseconds();
	const dateTime = format
		.toLowerCase()
		.replace(/dd/g, day.toString().padStart(2, '0'))
		.replace(/mm/g, (month + 1).toString().padStart(2, '0'))
		.replace(/month/g, (MONTHS[month] || '').substring(0, 3))
		.replace(/yyyy/g, year)
		.replace(/hrs/g, hours % 12 || hours)
		.replace(/min/g, minutes.toString().padStart(2, '0'))
		.replace(/sec/g, seconds.toString().padStart(2, '0'))
		.replace(/ms/g, miliseconds)
		.concat(` ${hours >= 12 ? 'pm' : 'am'}`);

	return dateTime;
};

export const formatLocales = (languages, locales) => {
	let response = {};

	response = languages.reduce((accum, lang) => {
		locales.forEach(locale => {
			// eslint-disable-next-line no-param-reassign
			accum[lang] = accum[lang] || {};
			// eslint-disable-next-line no-param-reassign
			accum[lang][locale.name] = locale.value[lang];
		});

		return accum;
	}, {});

	return response;
};

export const formatMoney = (value, decimals) => {
	const thousandsSeparator = ',';
	const isNegativeValue = value < 0;
	const numericValue = parseInt(value, 10).toString();
	const decimalValue = parseFloat(value)
		.toFixed(decimals || 0)
		.toString()
		.split('.')[1];
	const isThousandValue =
		numericValue.length > 3 ? numericValue.length % 3 : 0;
	const response = (isNegativeValue ? '-' : '')
		.concat(
			isThousandValue
				? numericValue.substr(0, isThousandValue) + thousandsSeparator
				: ''
		)
		.concat(
			numericValue
				.substr(isThousandValue)
				.replace(/(\d{3})(?=\d)/g, `$1${thousandsSeparator}`)
		)
		.concat(`${decimalValue ? `.${decimalValue}` : ''}`);

	return response;
};

export const formatTime = (datetime, format) => {
	const milliseconds = parseInt((datetime % 1000) / 100, 10);
	const seconds = parseInt((datetime / 1000) % 60, 10);
	const minutes = parseInt((datetime / (1000 * 60)) % 60, 10);
	const hours = parseInt((datetime / (1000 * 60 * 60)) % 24, 10);
	const response = format
		.toLowerCase()
		.replace(/hrs/g, hours.toString().padStart(2, '0'))
		.replace(/min/g, minutes.toString().padStart(2, '0'))
		.replace(/sec/g, seconds.toString().padStart(2, '0'))
		.replace(/ms/g, milliseconds);

	return response;
};

export const getIntlData = async (configIntl, axios, db) => {
	/*
  let sourceIntl = await axios.get(
    `${configIntl.url}/all?fields=alpha3Code;callingCodes;currencies;flag;languages;name;translations`
  );
  sourceIntl = sourceIntl.data;

  // countries 
  response.countries = sourceIntl
    .reduce((accum, item) => {
      accum = accum.concat({ 
        flag: item.flag,
        label: item.name, 
        value: item.alpha3Code.toLowerCase() 
      });

      return accum;
    }, [])
    .sort((a, b) => a.label.localeCompare(b.label));
  
  // calling codes
  response.callingCodes = sourceIntl
    .reduce((accum, item) => {
     accum = accum.concat(item.callingCodes
      .filter(callingCode => callingCode)
      .map(callingCode => ({ 
        countryFlag: item.flag,
        countryName: item.name,
        label: `${item.name} (+${callingCode})`, 
        value: `+${callingCode}` 
      }))
    );

      return accum;
    }, [])
    .filter((item, index, array) => array.findIndex(obj => obj.value === item.value) === index)
    .sort((a, b) => a.countryName.localeCompare(b.countryName));

  // currencies
  response.currencies = sourceIntl
    .reduce((accum, item) => {
      accum = accum.concat(item.currencies
        .filter(currencyInfo => currencyInfo.code && currencyInfo.code !== '(none)')
        .map(currencyInfo => ({ 
          countryFlag: item.flag,
          countryName: item.name,
          label: `${currencyInfo.name} (${currencyInfo.code.toUpperCase()})`, 
          value: currencyInfo.code.toLowerCase() 
        }))
      );

      return accum;
    }, [])
    .filter((item, index, array) => array.findIndex(obj => obj.value === item.value) === index)
    .sort((a, b) => a.countryName.localeCompare(b.countryName));
  
  // languages
  response.languages = sourceIntl
    .reduce((accum, item) => {
      accum = accum.concat(item.languages
        .filter(languageInfo => languageInfo.iso639_1)
        .map(languageInfo => ({ 
          countryFlag: item.flag,
          countryName: item.name,
          label: languageInfo.name, 
          value: languageInfo.iso639_1 
        }))
      );

      return accum;
    }, [])
    .filter((item, index, array) => array.findIndex(obj => obj.value === item.value) === index)
    .sort((a, b) => a.countryName.localeCompare(b.countryName));
  */
	const response = {};

	// international data
	response.countries = config.countries;
	response.callingCodes = config.callingCodes;
	response.currencies = config.currencies;
	response.languages = config.languages;

	// locales data
	const locales = await getDbQuery(db, 'locales', {});
	response.translations = formatLocales(configIntl.appLanguages, locales);

	return response;
};
