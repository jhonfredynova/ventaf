import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Footer(props) {
  const { translations } = props;
  const router = useRouter();
  const { locale, pathname, query } = router;

  return (
    <footer className="footer">
      <ul>
        <li>
          <Link href="/faq" passHref><a href="passHref">{translations.faq}</a></Link>
        </li>
        <li>
          <Link href="/privacy" passHref><a href="passHref">{translations.privacy}</a></Link>
        </li>
        <li>
          <Link href="/terms" passHref><a href="passHref">{translations.terms}</a></Link>
        </li>
        <li>
          <a href="mailto:construccionytecnologiasas@gmail.com" target="_blank" rel="noopener noreferrer">
            {translations.contact}
          </a>
        </li>
      </ul>

      <p className="branding">Construccion y Tecnologia SAS</p>

      <div className="languages-bar">
        <Link href={{ pathname, query }} locale="es" passHref>
          <a href="passHref" className={`link-language ${locale === 'es' ? 'active' : ''}`}>
            {translations.spanish}
          </a>
        </Link>
        <Link href={{ pathname, query }} locale="en" passHref>
          <a href="passHref" className={`link-language ${locale === 'en' ? 'active' : ''}`}>
            {translations.english}
          </a>
        </Link>
      </div>

      <style jsx>{`
        .footer {
          border-top: 1px solid var(--color-border);
          padding: calc(var(--spacer) * 2);
          text-align: center;

          ul {
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: center;
            > li {
              padding: 4px;

              :global(a) {
                color: var(--color-links);
                text-decoration: none;
              }
            }
          }

          .branding {
            font-weight: bold;
          }

          .languages-bar{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: var(--spacer);
            
            .link-language {
              display: flex;
              align-items: center;
              border: 1px solid var(--color-border);
              border-radius: var(--spacer);
              background-color: var(--color-secondary);
              color: var(--color-text);
              padding: var(--spacer);
              text-decoration: none;

              :first-child {
                margin-right: 5px;
              }

              &.active {
                background-color: var(--color-primary);
                color: white;
                cursor: default;
              }

              img {
                margin-right: 5px;
              }
            }
          }
        }
      `}</style>
    </footer>
  );
}