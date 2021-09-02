import React from 'react';
import Head from 'next/head';
import { toSearchTerms } from '../utils/text-utils';

export default function SEO(props) {
  const { title, description } = props;
  const keywords = ['construccion', 'tecnologia', 'technology', 'realstate', 'jhonfredynova']
    .concat(toSearchTerms(title))
    .concat(toSearchTerms(description))
    .filter(keyword => keyword.length > 3);

  return (
    <Head>
      <title>{(title || '').concat(' | Construccion y Tecnologia SAS')}</title>
      {/* GOOGLE */}
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="robots" content="index, follow" />
      {/* FACEBOOK */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="business.business" />
      <meta property="og:site_name" content="Construccion y Tecnologia SAS" />
      <meta property="og:description" content={title} />
      {/* TWITTER  */}
      <meta name="twitter:card" content={description} />
      <meta name="twitter:creator" content="@jhonfredynova" />
      <meta name="twitter:site" content="@jhonfredynova" />
      {/* APP */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no" />
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#00aba9" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
}