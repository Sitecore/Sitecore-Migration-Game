import { Link } from '@chakra-ui/react';
import { FC } from 'react';
import CookieConsent from 'react-cookie-consent';

interface CookieDisclaimerProps {}

export const CookieDisclaimer: FC<CookieDisclaimerProps> = (props) => {
  return (
    <CookieConsent
      location="bottom"
      style={{ backgroundColor: '#fff', color: '#000' }}
      buttonStyle={{ backgroundColor: '#5548d9', color: '#fff' }}
    >
      We use cookies to provide functionality, to analyze our traffic and to enable social media functionality. By using
      this website, you agree to the terms of our{' '}
      <Link href="https://www.sitecore.com/trust/privacy-policy" color="primary" isExternal>
        Cookie Policy
      </Link>
      .
    </CookieConsent>
  );
};
