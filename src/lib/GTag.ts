import { AppConfig } from 'models/Config';

declare global {
  interface Window {
    gtag: any;
  }
}

export const pageView = (url: string) => {
  if (AppConfig.GaMeasurementId === '') {
    return;
  }

  console.log('pageView', url);

  window.gtag('config', `${AppConfig.GaMeasurementId}`, {
    page_page: url,
  });
};

export const event = (action: string, label: string, value: string) => {
  if (AppConfig.GaMeasurementId === '') {
    return;
  }

  console.log('event', action, label, value);

  window.gtag('event', action, {
    event_label: label,
    value: value,
  });
};
