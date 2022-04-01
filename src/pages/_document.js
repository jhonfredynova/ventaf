import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class HTML extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		const googleMapsKey = process.env.GOOGLE_MAPS_KEY;

		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
					<script
						dangerouslySetInnerHTML={{
							__html: `
            window.fDomain = "${process.env.FIREBASE_AUTH_DOMAIN}"
            window.fKey = "${process.env.FIREBASE_KEY}"
            window.gAnalyticsKey = "${process.env.GOOGLE_ANALITYCS_KEY}"
            window.gPlacesCb = function() {
              window.initOne && window.initOne();
              window.initTwo && window.initTwo();
            }
            `
						}}
					/>
					<script
						async
						defer
						src={`https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&libraries=places&callback=gPlacesCb`}
					/>
				</body>
			</Html>
		);
	}
}
