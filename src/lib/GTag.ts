import { AppConfig } from 'models/Config';
import { consoleLogger } from 'utils/consoleLogger';

declare global {
  interface Window {
    gtag: any;
  }
}

export const pageView = (url: string) => {
  if (AppConfig.GaMeasurementId === '') {
    return;
  }

  consoleLogger('pageView', url);

  window.gtag('config', `${AppConfig.GaMeasurementId}`, {
    page_page: url,
  });
};

export const event = (action: string, label: string, value: string) => {
  if (AppConfig.GaMeasurementId === '') {
    return;
  }

  consoleLogger('event', action, label, value);

  window.gtag('event', action, {
    event_label: label,
    value: value,
  });
};
