import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { userModifyArticle, userState } from '../../recoil/user';
import { ArticleTypes, deleteArticle } from '../../services/api';
import { StyledButton } from '../../shared/shared.style';

const DetailButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const DetailButton = styled(StyledButton)`
    align-self: flex-end;
    width: 75px;
`;

const DetailUserButton = ({ data }: { data: ArticleTypes }) => {
    const navigate = useNavigate();
    const userData = useRecoilValue(userState);
    const setUserModifyArticle = useSetRecoilState(userModifyArticle);
    const isMatch = userData._id === data.writer._id;

    const handleEditArticle = () => {
        setUserModifyArticle({
            article: data,
            modify: true,
        });
        navigate('/edit');
    };
    const handleDelete = async () => {
        const confirm = window.confirm('정말 삭제 하시겠어요?');
        if(!confirm) return ; 
        const params = {
            _id: data._id,
            imageIds: data.imageIds,
        };
        const response = await deleteArticle(params);

        if (response.success) {
            navigate('/');
        }
    };

    return isMatch ? (
        <DetailButtonWrapper>
            <DetailButton onClick={handleEditArticle}>수정</DetailButton>
            <DetailButton onClick={handleDelete}>삭제</DetailButton>
        </DetailButtonWrapper>
    ) : null;
};
export default DetailUserButton;
