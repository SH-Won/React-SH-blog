import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import DetailContent from '../components/Detail/DetailContent';
import { getArticle } from '../services/api';
import { ArticleTypes } from '../services/api';
import '../highlight.css';
import DetailInfo from '../components/Detail/DetailInfo';
import styled from 'styled-components';
import DetailUserButton from '../components/Detail/DetailUserButtons';
import Loading from '../components/Loading/Loading';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/user';
import UserFavoriteButton from '../components/Detail/UserFavoriteButton';

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
`;

const DetailArticlePage = () => {
    const { id } = useParams();
    const { data, isLoading } = useQuery<ArticleTypes | undefined>(`${id}`, () => getArticle(id as string));
    
    const stringToHTML = useMemo(() => {
        return data ? <div className={'ql-content'} dangerouslySetInnerHTML={{ __html: data?.data }}></div> : null;
    }, [isLoading]);
    
    const calcTime = useMemo(() => {
        if (!data) return;

        const date = new Date(data?.createdAt as string).toLocaleString('ko-KR').split('. ');
        return `${date[0]}년 ${date[1]}월 ${date[2]}일 ${date[3]}`;
    }, [isLoading]);


    if (isLoading) return <Loading/>
    console.log(data);
    return !isLoading ? (
        <DetailContainer>
            <DetailInfo title={data?.title as string} time={calcTime as string} />
            <UserFavoriteButton favoriteCount={data?.favoriteCount as number} articleId={id as string}/>
            <DetailUserButton data={data as ArticleTypes} />
            <DetailContent data={stringToHTML} />
        </DetailContainer>
    ) : null;
};

export default DetailArticlePage;
