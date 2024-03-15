import createMiddleware from 'next-intl/middleware';

const middleware = createMiddleware({
  locales: ['en', 'he'],
  defaultLocale: 'en'
});

export default middleware;

export const config = {
  matcher: ['/', '/(he|en)/:page*']
};