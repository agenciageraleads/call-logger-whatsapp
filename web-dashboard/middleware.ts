import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Ignora rotas da API, rotas públicas e recursos estáticos (Next.js)
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api/webhooks') ||
        pathname.startsWith('/api/cron') ||
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    // Pega o cookie
    const hasSession = request.cookies.has('admin_session');

    // Se estiver tentando acessar o login, e já tiver sessão, joga pro dashboard
    if (pathname === '/login') {
        if (hasSession) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }

    // Se estiver em qualquer outra rota e não tiver sessão, exige o login
    if (!hasSession) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
