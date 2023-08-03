import { initServer } from '@sitecore/engage';
import { ISettingsParamsServer } from '@sitecore/engage/types/lib/settings/settings';
import { INextResponse } from '@sitecore/engage/types/lib/utils/interfaces';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Loads the Sitecore CDP Engage middleware, which does server-side cookie handling
 */
export const engageMiddleware = async (request: NextRequest) => {
  const response = NextResponse.next();

  const engageSettings: ISettingsParamsServer = {
    clientKey: process.env.SITECORE_CDP_CLIENT_KEY || '',
    targetURL: process.env.SITECORE_CDP_TARGET_URL || '',
    pointOfSale: process.env.SITECORE_CDP_POS || '',
    cookieDomain: process.env.SITECORE_CDP_COOKIE_DOMAIN || '',
    cookieExpiryDays: 365,
    forceServerCookieMode: true,
  };

  const engageServer = initServer(engageSettings);
  await engageServer.handleCookie(request, response as INextResponse);

  return response;
};
