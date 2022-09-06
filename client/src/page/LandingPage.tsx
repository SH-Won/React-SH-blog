import { useQuery, useQueryClient } from 'react-query';
import React, { useState } from 'react';
import { getArticles, ArticleTypes } from '../services/api';
import ItemSection from '../components/Landing/ItemSection';
import { useLocation } from 'react-router-dom';

interface Data<T> {
    postSize: number;
    posts: T[];
}
interface FetchState {
    skip: number;
    limit: number;
}
const LandingPage = () => {
    const queryClient = useQueryClient();
    const {pathname} = useLocation();
    const params = {
        category : pathname === '/' ? 'popular' : '',
    }
    console.log(params);
    const { isLoading, error, data } = useQuery<Data<ArticleTypes> | undefined, Error>(pathname === '/' ? 'popular' : 'recnet', () => getArticles(params));

    if (isLoading) return <div>로딩 중...</div>;

    return <div style={{backgroundColor : '#f8f9fa'}}>
    <ItemSection items={data?.posts} />
    </div>
};

export default LandingPage;
