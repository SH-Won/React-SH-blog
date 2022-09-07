import React, { useEffect } from 'react';
import { ComponentType } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
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
        const { data, isLoading } = useQuery<UserType>('user', auth,{
            enabled:true,
        });
        console.log('auth', data, isLoading);
        // if (isLoading) return <div>checking..</div>;

        useEffect(() => {
            if (!data) return;

            if (!data.user.isAuth) {
                if (isLogin) navigate('/login');
            } else {
                setItem('token', data.token);
                setItem('refreshToken', data.refreshToken);
            }
        }, [isLoading]);

        return  <Component {...props} user={data?.user} /> 
    };
}

// if (!data?.user.isAuth) {
//     console.log('if')
//     if (isLogin) {
//         navigate('/login');
//         return null;
//     }
//     else return <Component {...props} />;
// } else {
//     console.log('else')
//     setItem('token', data.token);
//     setItem('refreshToken', data.refreshToken);
//     return <Component {...props} user={data.user} />;
// }

export default Auth;
