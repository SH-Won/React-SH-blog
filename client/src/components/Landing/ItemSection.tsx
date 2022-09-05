import React from 'react';
import styled from 'styled-components';

import * as Common from '../../shared/shared.style';
import { ArticleTypes, Post } from 'src/services/api';
import { Link } from 'react-router-dom';

interface ArticleProps {
    flex?: string;
}
const FlexContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;
const Article = styled.article<ArticleProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex: ${props => props.flex};
    width: calc((100% - (6 * 1rem)) / 3);
    margin: 1rem;
    height:100%;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 7%) 0px 4px 16px 0px;
    box-sizing: border-box;
    overflow: hidden;
    transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
    @media screen and (max-width: 749px) {
        width: calc((100% - (4 * 1rem)) / 2);
    }
    @media screen and (max-width: 501px) {
        width: calc((100% - (2 * 1rem)));
    }
    
    &:hover{
        cursor: pointer;
    box-shadow: rgb(0 0 0 / 20%) 0px 4px 16px 0px;
    }
`;
const RouterLink = styled(Link)`
margin:0;
padding:0;
text-decoration: none;
width:100%;
height:100%;
color:black;

`
const Title = styled.h3`
   overflow:hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   /* word-wrap : break-word; */
   width:100%;
   text-align: center;
   padding:1.2rem;
   font-size:1.2rem;
   margin:0;
   box-sizing: border-box;
`

const Item = ({ item }: { item: ArticleTypes }) => {
    return (
        
        <Article>
            <RouterLink to={`/detail/${item._id}`}>
            <Common.Figure ratio={13 / 16}>
                <Common.Image src={item.thumbnail} alt={item.title} />
            </Common.Figure>
            <Title style={{}}>{item.title}</Title>
            </RouterLink>
        </Article>
        
    );
};

const ItemSection = ({ items }: { items: ArticleTypes[] | undefined }) => {
    return <FlexContainer>{items && items?.map(item => <Item key={item._id} item={item} />)}</FlexContainer>;
};

export default ItemSection;
