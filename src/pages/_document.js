import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head />
			<body>
				<Main />
				<NextScript />
				<script
					dangerouslySetInnerHTML={{
						__html: `
							window.fDomain = "${process.env.FIREBASE_AUTH_DOMAIN}";
							window.fKey = "${process.env.FIREBASE_KEY}";
							window.gAnalyticsKey = "${process.env.GOOGLE_ANALITYCS_KEY}";
							window.gPlacesKey = "${process.env.GOOGLE_MAPS_KEY}";
							window.gPlacesCb = function() {
								window.initOne && window.initOne();
								window.initTwo && window.initTwo();
							}
						`,
					}}
				/>
			</body>
		</Html>
	);
}
