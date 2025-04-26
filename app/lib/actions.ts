'use server';

import { cookies } from "next/headers";

export async function handleLogin(
    userId: string,
    accessToken: string,
    refreshToken: string
) {
    const isProduction = process.env.NODE_ENV === 'production';

    const cookieStore = await cookies();  // <-- await here!

    // Set user ID cookie (7 days)
    cookieStore.set('session_userid', userId, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,  // 7 days
        path: '/',
    });

    // Set access token cookie (1 hour)
    cookieStore.set('session_access_token', accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        maxAge: 60 * 60,  // 1 hour
        path: '/',
    });

    // Set refresh token cookie (7 days)
    cookieStore.set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,  // 7 days
        path: '/',
    });
}

export async function resetAuthCookies() {
    const cookieStore = await cookies();

    cookieStore.set('session_userid', '', {
        maxAge: 0,
        path: '/',
    });
    cookieStore.set('session_access_token', '', {
        maxAge: 0,
        path: '/',
    });
    cookieStore.set('session_refresh_token', '', {
        maxAge: 0,
        path: '/',
    });
}


//GET data...

export async function getUserID() {
    const cookieStore = await cookies();

    const userId = cookieStore.get('session_userid')?.value

    return userId ? userId : null ;
}