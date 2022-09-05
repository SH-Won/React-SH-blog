import axios, { AxiosResponse } from 'axios';

const BASE_URL = `${window.origin}`;

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
    writer: string;
    _id: string;
}
export const getPosts = async () => {
    try {
        const response: AxiosResponse = await axios.get(BASE_URL + '/api/posts');
        return response.data as { postSize: number; posts: Post[] };
    } catch (e) {}
};
export const getArticles = async () => {
    try {
        const response: AxiosResponse = await axios.get(BASE_URL + '/api/posts/article');
        return response.data as { postSize: number; posts: ArticleTypes[] };
    } catch (e) {}
};
export const getArticle = async (id : string) => {
    try{
        const response : AxiosResponse = await axios.get(BASE_URL + `/api/posts/detailArticle?articleId=${id}`)
        return response.data[0] as ArticleTypes;

    }catch(e){

    }

}
