import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import DetailContent from '../components/Detail/DetailContent';
import { getArticle } from '../services/api';
import { ArticleTypes } from '../services/api';
import '../highlight.css';
import styled from 'styled-components';
import DetailInfo from '../components/Detail/DetailInfo';
import { StyledButton } from '../shared/shared.style';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userModifyArticle, userState } from '../recoil/user';

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
`;
const DetailButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const DetailButton = styled(StyledButton)`
    align-self: flex-end;
    width: 75px;
`;

const UserButtonContainer = ({ data }: { data: ArticleTypes }) => {
    const navigate = useNavigate();
    const userData = useRecoilValue(userState);
    const setUserModifyArticle = useSetRecoilState(userModifyArticle);
    console.log(data.writer._id, userData._id);
    const isMatch = userData._id === data.writer._id;
    const handleEditArticle = () => {
        setUserModifyArticle({
            article: data,
            modify: true,
        });
        navigate('/edit');
    };
    const handleRemoveArticle = () => {};

    return isMatch ? (
        <DetailButtonWrapper>
            <DetailButton onClick={handleEditArticle}>수정</DetailButton>
            <DetailButton onClick={handleRemoveArticle}>삭제</DetailButton>
        </DetailButtonWrapper>
    ) : null;
};
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

    if (isLoading) return <div>article loading...</div>;

    return !isLoading ? (
        <DetailContainer>
            <DetailInfo title={data?.title as string} time={calcTime as string} />
            <UserButtonContainer data={data as ArticleTypes} />
            <DetailContent data={stringToHTML} />
        </DetailContainer>
    ) : null;
};

export default DetailArticlePage;
