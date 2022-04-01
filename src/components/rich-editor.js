import 'react-quill/dist/quill.snow.css';
import React from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function RichEditor(props) {
	const { style, value, onChange } = props;

	return (
		<ReactQuill
			style={style}
			value={value}
			onChange={newValue => onChange(newValue)}
		/>
	);
}
