import Navigation from 'components/ui/Navigation/Navigation';
import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Navigation />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
