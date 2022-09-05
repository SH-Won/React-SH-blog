import { useQuery, useQueryClient } from 'react-query';
import React, { useState } from 'react';
import { getArticles, ArticleTypes } from '../services/api';
import ItemSection from '../components/Landing/ItemSection';

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
    const [fetchState, setFetchState] = useState<FetchState>({ skip: 0, limit: 6 });
    const { isLoading, error, data } = useQuery<Data<ArticleTypes> | undefined, Error>('posts', getArticles);

    if (isLoading) return <div>로딩 중...</div>;

    return <ItemSection items={data?.posts} />;
};

export default LandingPage;
