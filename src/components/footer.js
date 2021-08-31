import React from 'react';
import Link from 'next/link';

export default function Footer(props) {
  const { translations } = props;

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
        }
      `}</style>
    </footer>
  );
}