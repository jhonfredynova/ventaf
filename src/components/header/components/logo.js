import React from 'react';
import Image from 'next/image';

export default function Logo(props) {
  const { translations } = props;

  return (
    <div className="logo">
      <Image src="/logo.png" alt={translations['slogan']} width={35} height={35} />{' '}
      <span className="text1">Construccion</span>
      <span className="text2">&</span>
      <span className="text3">Tecnologia</span>
      <style jsx>{`
        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;

          .text1 {
            color: var(--color-links);
            margin-bottom: 2px;
            margin-left: 5px;
          }

          .text2 {
            color: var(--color-text);
            font-weight: bold;
            margin: 0 2px;
          }

          .text3 {
            color: var(--color-alert);
            margin-top: 2px;
          }

          @keyframes venta {
            0% { 
              margin-top: -40px;
              opacity: 100; 
            }
            33% { 
              margin-top: -30;
              opacity: 90; 
            }
            66% { 
              margin-top: -15;
              opacity: 60; 
            }
            100% { 
              margin-top: 0;
              opacity: 0; 
            }
          }
          @keyframes exitosa {
            0% { 
              margin-bottom: -40px;
              opacity: 100; 
            }
            33% { 
              margin-bottom: -30;
              opacity: 90; 
            }
            66% { 
              margin-bottom: -15;
              opacity: 60; 
            }
            100% { 
              margin-bottom: 0;
              opacity: 0; 
            }
          }
        }  
      `}</style>
    </div>
  );
}