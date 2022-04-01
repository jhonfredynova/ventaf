import React from 'react';
import NumberFormat from 'react-number-format';

export default function InputNumeric(props) {
	const {
		id,
		className,
		decimalScale,
		disabled,
		format,
		inputType,
		placeholder,
		prefix,
		suffix,
		value,
		onChange
	} = props;

	const getInputRef = inputRef => {
		if (inputRef) {
			const { autocomplete } = props;
			// eslint-disable-next-line no-param-reassign
			inputRef.autocomplete = autocomplete;
			// eslint-disable-next-line no-param-reassign
			inputRef.disabled = disabled;
		}
	};

	return (
		<NumberFormat
			id={id}
			className={className}
			decimalScale={decimalScale}
			format={format}
			getInputRef={getInputRef}
			placeholder={placeholder}
			allowEmptyFormatting={false}
			type={inputType}
			value={value}
			displayType="input"
			prefix={prefix}
			suffix={suffix}
			thousandSeparator=","
			decimalSeparator="."
			onValueChange={newValue => onChange(newValue.floatValue)}
		/>
	);
}
