import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Footer(props) {
  const { translations } = props;
  const router = useRouter();

  return (
    <footer className="footer">
      <ul>
        <li>
          <Link href="/faq"><a>{translations.faq}</a></Link>
        </li>
        <li>
          <Link href="/privacy"><a>{translations.privacy}</a></Link>
        </li>
        <li>
          <Link href="/terms"><a>{translations.terms}</a></Link>
        </li>
        <li>
          <a href="mailto:construccionytecnologiasas@gmail.com" target="_blank" rel="noopener noreferrer">
            {translations.contact}
          </a>
        </li>
      </ul>

      <p className="branding">Construccion y Tecnologia SAS &copy; 2020</p>

      <div className="languages-bar">
        <Link href={router.pathname} locale="es">
          <a className="link-language">
            {translations.spanish}
          </a>
        </Link>
        <Link href={router.pathname} locale="en">
          <a className="link-language">
          {translations.english}
          </a>
        </Link>
      </div>

      <style jsx>{`
        .footer {
          border-top: 1px solid var(--border-color);
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
              border: 1px solid var(--border-color);
              border-radius: var(--border-radius);
              padding: var(--spacer);
              text-decoration: none;

              img {
                margin-right: 5px;
              }

              :first-child {
                margin-right: 5px;
              }
            }
          }
        }
      `}</style>
    </footer>
  );
}