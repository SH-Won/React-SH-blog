import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import DetailContent from '../components/Detail/DetailContent';
import { getArticle } from '../services/api';
import { ArticleTypes } from '../services/api';
import '../style_quill.css';
import '../highlight.css';
import styled from 'styled-components';
import DetailInfo from '../components/Detail/DetailInfo';

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const DetailArticlePage = () => {
    const { id } = useParams();
    const { data, isLoading } = useQuery<ArticleTypes | undefined>('article', () => getArticle(id as string));

    const stringToHTML = useMemo(() => {
        return data ? <div className={'ql-content'} dangerouslySetInnerHTML={{ __html: data?.data }}></div> : null;
    }, [isLoading]);
    const calcTime = useMemo(() => {
        if(!data) return ;

        const date = new Date(data?.createdAt as string).toLocaleString('ko-KR').split('. ');
        return `${date[0]}년 ${date[1]}월 ${date[2]}일 ${date[3]}`
    },[isLoading])

  
    if (isLoading) return <div>article loading...</div>;
    return (
      !isLoading ? 
        <DetailContainer>
            <DetailInfo title={data?.title as string} time={calcTime as string}/>
            <DetailContent data={stringToHTML} />
        </DetailContainer> 
        : null
    );
};

export default DetailArticlePage;
