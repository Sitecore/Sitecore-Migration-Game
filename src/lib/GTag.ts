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

  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_page: url,
  });
};

export const event = (action: string, category: string, label: string, value: string) => {
  if (AppConfig.GaMeasurementId === '') {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
