import { getItem } from './../utils/storage';
import axios, { AxiosResponse } from 'axios';

const BASE_URL = `${window.origin}`;

interface Writer {
    _id: string;
}
export interface Post {
    category: number;
    description: string;
    imageUrl: string;
    imageUrls: string[];
    title: string;
    _id: string;
}
export interface ArticleTypes {
    category: number;
    createdAt: string;
    data: string;
    favoriteCount: number;
    imageIds: string[];
    thumbnail: string;
    title: string;
    updatedAt: string;
    writer: Writer;
    _id: string;
}
export interface GetArticleParams {
    category?: string;
}
interface UploadData {
    userId: string;
    paths: string[];
}
export const getPosts = async () => {
    try {
        const response: AxiosResponse = await axios.get(BASE_URL + '/api/posts');
        return response.data as { postSize: number; posts: Post[] };
    } catch (e) {}
};
export const getArticles = async (params: object) => {
    const query = Object.entries(params)
        .map(([key, value]) => key + '=' + value)
        .join('&');
    const ENDPOINT = BASE_URL + '/api/posts/article?' + query;
    try {
        const response: AxiosResponse = await axios.get(ENDPOINT);
        return response.data as { postSize: number; posts: ArticleTypes[] };
    } catch (e) {}
};
export const getArticle = async (id: string) => {
    try {
        const response: AxiosResponse = await axios.get(BASE_URL + `/api/posts/detailArticle?articleId=${id}`);
        return response.data[0] as ArticleTypes;
    } catch (e) {}
};
export const uploadCloudinary = async (data: UploadData) => {
    try {
        const response: AxiosResponse = await axios.post(BASE_URL + '/api/posts/upload', data);
        return response.data;
    } catch (e) {}
};
export interface UploadArticleData {
    _id?: string;
    writer: string;
    title: string;
    data: string;
    category: number;
    thumbnail: string;
    imageIds: string[];
    removeIds: string[];
}
interface DeleteArticleData {
    _id: string;
    imageIds: string[];
}
export interface UpdateArticleData extends UploadArticleData {
    _id: string;
}
export const uploadArticle = async (data: UploadArticleData) => {
    try {
        const response: AxiosResponse = await axios.post(BASE_URL + '/api/posts/uploadArticle', data);
        return response.data;
    } catch (e) {}
};
export const updateArticle = async (data: UploadArticleData) => {
    try {
        const response: AxiosResponse = await axios.post(BASE_URL + '/api/posts/updateArticle', data);
        return response.data;
    } catch (e) {}
};
export const deleteArticle = async (data: DeleteArticleData) => {
    try {
        const response: AxiosResponse = await axios.post(BASE_URL + '/api/posts/deleteArticle', data);
        return response.data;
    } catch (e) {}
};

type LoginParams = {
    email: string;
    password: string;
};
export const loginUser = async (params: LoginParams) => {
    try {
        const response: AxiosResponse = await axios.post(BASE_URL + '/api/users/login', params);
        return response.data;
    } catch (e) {}
};
export const logOutUser = async () => {
    try {
        const response: AxiosResponse = await axios.get(BASE_URL + '/api/users/logout', {
            withCredentials: true,
            headers: {
                authorization: getItem('token'),
                refreshtoken: getItem('refreshToken'),
            },
        });
        return response.data;
    } catch (e) {}
};
export const auth = async () => {
    try {
        const response: AxiosResponse = await axios.get(BASE_URL + '/api/users/auth', {
            withCredentials: true,
            headers: {
                authorization: getItem('token'),
                refreshtoken: getItem('refreshToken'),
            },
        });
        return response.data;
    } catch (e) {}
};

export const updateFavorite = async (data ={}) => {
    try{
        const response : AxiosResponse = await axios.post(BASE_URL + '/api/users/favorite',data);
        return response.data;
    }catch(e){
        
    }
}
