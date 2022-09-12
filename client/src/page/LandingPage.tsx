import { useQuery } from 'react-query';
import React from 'react';
import { getArticles, ArticleTypes } from '../services/api';
import ItemSection from '../components/Landing/ItemSection';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { RouteLink, StyledButton } from '../shared/shared.style';
import Loading from '../components/Loading/Loading';

interface Data<T> {
    postSize: number;
    posts: T[];
}
interface FetchState {
    skip: number;
    limit: number;
}
const LandingContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f8f9fa;
`;
const EditButton = styled(StyledButton)`
    align-self: end;
    margin: 1rem;
`;
const LandingPage = () => {
    const { pathname } = useLocation();
    const params = {
        category: pathname === '/' ? 'popular' : '',
    };
    const { isLoading, error, data } = useQuery<Data<ArticleTypes> | undefined, Error>(
        pathname === '/' ? 'popular' : 'recnet',
        () => getArticles(params),
    );

    if (isLoading) return <Loading/>;

    return (
        <LandingContainer>
            <Loading/>
            <EditButton>
                <RouteLink to="/edit" color={'inherit'}>
                    글 쓰기
                </RouteLink>
            </EditButton>
            <ItemSection items={data?.posts} />
        </LandingContainer>
    );
};

export default LandingPage;
