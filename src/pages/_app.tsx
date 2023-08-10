import { ChakraProvider } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import fantasyTheme from 'chakra/theme/fantasy/Theme';
import { GameInfoProvider } from 'components/ui';
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
        <ChakraProvider theme={fantasyTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </GameInfoProvider>
    </>
  );
};

export default MyApp;
