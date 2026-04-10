import {hasLocale} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: {
      common: (await import(`./locales/${locale}/common.json`)).default,
      forms: (await import(`./locales/${locale}/forms.json`)).default,
      products: (await import(`./locales/${locale}/products.json`)).default,
      pages: (await import(`./locales/${locale}/pages.json`)).default,
      metadata: (await import(`./locales/${locale}/metadata.json`)).default,
    }
  };
});
