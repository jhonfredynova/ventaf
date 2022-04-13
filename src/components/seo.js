import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { toSearchTerms } from '../utils/text-utils';

export default function SEO(props) {
	const { title, description, imageUrl } = props;
	const router = useRouter();
	const { asPath } = router;
	const siteName = 'Ventaf';
	const keywords = ['ventaf', 'ventas', 'compras', 'productos', 'servicios', 'jhonfredynova']
		.concat(toSearchTerms(title))
		.concat(toSearchTerms(description))
		.filter((keyword) => keyword.length > 3);

	return (
		<Head>
			<title>{(title || '').concat(` | ${siteName}`)}</title>
			{/* GOOGLE */}
			<meta charSet="utf-8" />
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords.join(', ')} />
			<meta name="robots" content="index, follow" />
			{/* FACEBOOK */}
			<meta property="og:title" content={title} />
			<meta property="og:type" content="business.business" />
			<meta property="og:site_name" content={siteName} />
			<meta property="og:description" content={title} />
			{imageUrl && <meta property="og:image" content={imageUrl} />}
			{/* TWITTER  */}
			<meta name="twitter:card" content={description} />
			<meta name="twitter:creator" content={siteName} />
			<meta name="twitter:site" content={siteName} />
			{imageUrl && <meta name="twitter:image" content={imageUrl} />}
			{/* APP */}
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no"
			/>
			<link rel="canonical" href={`${process.env.NEXT_PUBLIC_SERVER_URL}/${asPath}`} />
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			<link rel="manifest" href="/site.webmanifest" />
			<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
			<meta name="msapplication-TileColor" content="#ffc40d" />
			<meta name="theme-color" content="#ffffff" />
		</Head>
	);
}
