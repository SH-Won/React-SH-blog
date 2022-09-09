import { getItem, setItem, removeItem } from './../utils/storage';
import { auth } from './../services/api';
import { selector, atom } from 'recoil';

export const loginState = atom({
    key: 'loginState',
    default: getItem('loginSuccess'),
});

export const loginStateSelector = selector({
    key: 'loginStateSelector',
    get: ({ get }) => {
        const isLogin = get(loginState);
        switch (isLogin) {
            case true: {
                setItem('loginSuccess', true);
                break;
            }
            case false: {
                console.log('false');
                setItem('loginSuccess', false);
                removeItem('token');
                removeItem('refreshToken');
                break;
            }
        }
        return isLogin;
    },
    set: ({ get, set }, newValue) => {},
});

export const userState = atom({
    key: 'userState',
    default: {
        user: {
            isAuth: false,
        },
    },
});

export const userStateSelector = selector({
    key: 'userStateSelector',
    get: async ({ get }) => {
        const response = await auth();
        return response;
    },
    set: ({ get, set }, newValue) => {
        const { user, token, refreshtoken } = newValue;
        set(userState, user);
        setItem('token', token);
        setItem('refreshToken', refreshtoken);
    },
});
