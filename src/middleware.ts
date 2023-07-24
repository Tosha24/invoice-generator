import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest){
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup' || path === '/' || path === '/verifyemail'
    
    const isLogin = request.cookies.get('token')

    if(!isLogin && path.startsWith('/profile')){
        return NextResponse.rewrite(new URL('/login', request.nextUrl));
    }
    else if(isLogin && isPublicPath){
        return NextResponse.next();
    }
}