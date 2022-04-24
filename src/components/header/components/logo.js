import React from 'react';
import Image from 'next/image';

export default function Logo(props) {
	const { translations } = props;

	return (
		<div className="logo">
			<Image src="/logo.png" alt={translations.slogan} layout="fixed" width={35} height={35} />{' '}
			<span className="text">Ventaf</span>
			<style jsx>{`
				.logo {
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 2rem;

					.text {
						color: var(--color-text);
						font-weight: bold;
						margin-bottom: 2px;
						margin-left: 5px;
					}
				}
			`}</style>
		</div>
	);
}
