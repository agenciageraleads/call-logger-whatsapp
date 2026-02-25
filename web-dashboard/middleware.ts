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

    // Pega os cookies
    const hasSession = request.cookies.has('admin_session');
    const userRole = request.cookies.get('user_role')?.value;

    // Se estiver tentando acessar o login, e já tiver sessão, joga pro lugar certo
    if (pathname === '/login') {
        if (hasSession) {
            if (userRole === 'SUPER_ADMIN') {
                return NextResponse.redirect(new URL('/master', request.url));
            }
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }

    // Se estiver em qualquer outra rota e não tiver sessão, exige o login
    if (!hasSession) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Proteção da rota Master
    if (pathname.startsWith('/master')) {
        if (userRole !== 'SUPER_ADMIN') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Se for Super Admin tentando acessar a home comum, talvez queira ir pro master, 
    // mas deixamos livre para transitar se necessário. 

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
