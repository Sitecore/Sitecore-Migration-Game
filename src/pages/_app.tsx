import { Analytics } from '@vercel/analytics/react';
import { GameInfoProvider, ThemeSwitcher } from 'components/ui';
import { AppProps } from 'next/app';
import { Fondamento } from 'next/font/google';
import Head from 'next/head';

const fondamento = Fondamento({ weight: '400', subsets: ['latin'] });

const MyApp = ({ Component, pageProps }: AppProps) => {
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
      </Head>
      <Analytics />
      <GameInfoProvider>
        <ThemeSwitcher>
          <Component {...pageProps} />
        </ThemeSwitcher>
      </GameInfoProvider>
    </>
  );
};

export default MyApp;
