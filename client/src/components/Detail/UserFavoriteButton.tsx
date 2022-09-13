import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { userState } from '../../recoil/user';
import { updateFavorite } from '../../services/api';
interface FavoriteButtonProps {
    clicked: boolean;
}
const FavoriteButton = styled.button<FavoriteButtonProps>`
    align-self: flex-end;
    outline: none;
    border: 0.2px solid #e7e4e4;
    background-color: #e7e4e4;
    color: black;
    border-radius: 16px;
    text-align: center;

    width: 75px;
    color: gray;
    margin: 1rem 0;
    padding: 0.5rem;
    ${props =>
        props.clicked &&
        css`
            border: 0.2px solid #d5f7e7;
            background-color: #d5f7e7;
            color: #015834;
        `}
`;
interface UserFavoriteButtonProps {
    favoriteCount : number;
    articleId : string;
}
const UserFavoriteButton = ({favoriteCount,articleId} : UserFavoriteButtonProps) => {
    const userData = useRecoilValue(userState);
    const [count,setCount]  = useState(favoriteCount);
    const [clicked,setClicked] = useState(userData.favorite.includes(articleId));
    console.log(userData)
    const handleFavoriteCount = async () => {
        if(!userData.isAuth){
            alert('로그인이 필요해요!');
            return ;
        }
        const diffCount = clicked ? -1 : 1;
        const data = {
            count : diffCount,
            articleId,
        }
        const response = await updateFavorite(data);
        if(response.success){
            setCount(prev => prev+diffCount);
            setClicked(prev => !prev);
        }
    }

    return (
        <FavoriteButton clicked={clicked} onClick={handleFavoriteCount}>
            좋아요 {count}
        </FavoriteButton>
    );
};

export default UserFavoriteButton;
