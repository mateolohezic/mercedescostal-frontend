import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const BLOCKED_PATHS = [
  '/wp-admin',
  '/wp-login',
  '/wp-login.php',
  '/wp-content',
  '/wp-includes',
  '/wp-json',
  '/xmlrpc.php',
  '/wp-cron.php',
  '/wp-config',
  '/wp-settings',
  '/wp-mail.php',
  '/wp-signup.php',
  '/wp-trackback.php',
  '/wp-blog-header.php',
  '/wp-links-opml.php',
  '/wp-load.php',
  '/wp-comments-post.php',
  '/administrator',
  '/admin.php',
  '/phpmyadmin',
  '/pma',
  '/mysql',
  '/.env',
  '/.git',
  '/.htaccess',
  '/.htpasswd',
  '/config.php',
  '/install.php',
  '/setup.php',
  '/backup',
  '/database',
  '/db',
  '/wordpress',
  '/wp',
  '/cgi-bin',
  '/server-status',
  '/server-info',
];

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const lowerPath = request.nextUrl.pathname.toLowerCase();

  const isBlocked = BLOCKED_PATHS.some(
    (blocked) => lowerPath === blocked || lowerPath.startsWith(blocked + '/')
  );

  if (isBlocked) {
    return new NextResponse(null, { status: 410 });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    '/:path*.php',
    '/wp-:path*',
    '/.:path*',
    '/administrator/:path*',
    '/phpmyadmin/:path*',
    '/pma/:path*',
    '/cgi-bin/:path*',
  ],
};
