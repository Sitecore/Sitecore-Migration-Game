import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider theme={{ colorScheme: 'light' }}>
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default MyApp;
