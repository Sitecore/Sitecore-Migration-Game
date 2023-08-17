import { Analytics } from '@vercel/analytics/react';
import { EngageTrackerProvider, GameInfoProvider } from 'components/Contexts';
import { ThemeSwitcher } from 'components/ui';
import { AppProps } from 'next/app';
import { Fondamento } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';

const fondamento = Fondamento({ weight: '400', subsets: ['latin'] });

const MyApp = ({ Component, pageProps }: AppProps) => {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-fondamento: ${fondamento.style.fontFamily};
          }
        `}
      </style>
      <Head>
        <title>Sitecore Migration Adventure</title>
        <link rel="icon" href={`/favicon.png`} />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
        
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });`}
        </Script>
      </Head>
      <Analytics />
      <EngageTrackerProvider>
        <GameInfoProvider>
          <ThemeSwitcher>
            <Component {...pageProps} />
          </ThemeSwitcher>
        </GameInfoProvider>
      </EngageTrackerProvider>
    </>
  );
};

export default MyApp;
