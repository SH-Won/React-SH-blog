import { getItem, setItem, removeItem } from './../utils/storage';
import { auth, ArticleTypes } from './../services/api';
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
type UserDataType = {
    isAuth : boolean,
    _id : string,
    favorite : string [];
}
export const userState = atom<UserDataType>({
    key: 'userState',
    default: {
        isAuth: false,
        _id: '',
        favorite : [],
    },
});
export const userUpdateFavorteArticle = selector({
    key : 'userfavoriteArticle',
    get : async ({get}) => {
        

    },
    set : async ({get,set}, newValue) => {

    }
})

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

export const userModifyArticle = atom<{ modify: boolean; article: ArticleTypes }>({
    key: 'userModifyArticle',
    default: {
        modify: false,
        article: {
            category: 0,
            createdAt: '',
            data: '',
            favoriteCount: 0,
            imageIds: [],
            thumbnail: '',
            title: '',
            updatedAt: '',
            writer: {
                _id: '',
            },
            _id: '',
        },
    },
});
export const userModifySelector = selector({
    key: 'userModifySelector',
    get: ({ get }) => {},
    set: ({ get, set }) => {
        set(userModifyArticle, {
            modify: false,
            article: {
                category: 0,
                createdAt: '',
                data: '',
                favoriteCount: 0,
                imageIds: [],
                thumbnail: '',
                title: '',
                updatedAt: '',
                writer: {
                    _id: '',
                },
                _id: '',
            },
        });
    },
});


