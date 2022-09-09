import React, { Suspense, useEffect } from 'react';
import { ComponentType } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../recoil/user';
import { auth } from '../services/api';
import { setItem } from '../utils/storage';

export type User = {
    _id?: string;
    isAdmin?: boolean;
    isAuth: boolean;
    email?: string;
    name?: string;
    role?: number;
    favorite?: string[];
    error?: boolean;
};
export type UserType = {
    user: User;
    token: string;
    refreshToken: string;
};

export interface WithAuthProps {
    navigate: ReturnType<typeof useNavigate>;
}

function Auth<P>(Component: ComponentType<P>, isLogin: boolean) {
    return (props: P) => {
        const navigate = useNavigate();

        const setUserData = useSetRecoilState(userState);

        useEffect(() => {
            (async () => {
                const userData = await auth();
                if (!userData.user.isAuth) {
                    if (isLogin) navigate('/login');
                } else {
                    const { token, refreshToken, user } = userData;
                    setUserData({ ...user });
                    setItem('token', token);
                    setItem('refreshToken', refreshToken);
                }
            })();
        }, []);

        return (
            <Suspense fallback={<div>user auth...</div>}>
                <Component {...props} />
            </Suspense>
        );
    };
}

export default Auth;
