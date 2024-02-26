import { Analytics } from '@vercel/analytics/react';
import { EngageTrackerProvider, GameInfoProvider } from 'components/Contexts';
import { ThemeProvider } from 'components/ui';
import * as GTag from 'lib/GTag';
import { AppConfig } from 'models/Config';
import { AppProps } from 'next/app';
import { Fondamento } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

const fondamento = Fondamento({ weight: '400', subsets: ['latin'] });

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      GTag.pageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
        <title>Sitecore Migration Advisor</title>
        <link rel="icon" href={`/favicon.png`} />
      </Head>
      {AppConfig.GaMeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${AppConfig.GaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
        
            gtag('config', '${AppConfig.GaMeasurementId}', {
              page_path: window.location.pathname,
            });`}
          </Script>
        </>
      )}
      <Analytics />
      <EngageTrackerProvider>
        <GameInfoProvider>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </GameInfoProvider>
      </EngageTrackerProvider>
    </>
  );
};

export default MyApp;
