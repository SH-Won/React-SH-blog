import React, { useState } from 'react'
import styled, { css } from 'styled-components'

interface FavoriteButtonProps{
    clicked:boolean;
}
const DetailInfoContainer = styled.div`

display:flex;
flex-direction: column;
width:100%;

`

const Time = styled.time`
align-self: flex-end;
font-size: 0.7rem;
`
const FavoriteButton = styled.button<FavoriteButtonProps>`
align-self : flex-end;
outline:none;
border:0.2px solid #e7e4e4;
background-color: #e7e4e4;
color:black;
border-radius: 16px;
text-align: center;

width:75px;
color:gray;
margin:1rem 0;
padding:.5rem;
${props => props.clicked && css`
    border:0.2px solid #d5f7e7;
    background-color: #d5f7e7;
    color:#015834
`}
`
interface InfoProps{
    title:string;
    time:string;
}
const DetailInfo :React.FC<InfoProps>= ({title,time}) => {
    const [isClick,setIsClick] = useState(false);

  return (
    <DetailInfoContainer>
        <h1>{title}</h1>
        <Time>{time}</Time>
        <FavoriteButton clicked={isClick} onClick={() => setIsClick(prev => !prev)}>좋아요</FavoriteButton>
    </DetailInfoContainer>
  )
}

export default DetailInfo