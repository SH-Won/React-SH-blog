import React from 'react'
import styled, { keyframes } from 'styled-components'

const anim1 = keyframes`
   0% {   transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
`
const anim2 = keyframes`
0%   { transform: scale(0.2); left:   0%; }
        50%  { transform: scale(1.0); left:  50%; }
        100% { transform: scale(0.2); left: 100%; }
    
`
const LoadingContainer = styled.div`
width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 3em;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    animation: 1s infinite ease-in-out;
    &:before,&:after {
        animation: 1s infinite ease-in-out;
    }
    &:before,&:after {
        width: 100%; 
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    }
`
const LoadingCircle = styled.div`


animation : ${anim1} 1.5s infinite linear;

&:before,&:after {
    content:'';
    margin:-25px 0 0 -25px;
    top:50%;
    left:50%;
    background-color: rgba(30,30,30,0.7);
    animation-name: ${anim2};
}
&:after{
    animation-direction: reverse;
    animation-name:${anim2};
}
`

const Loading = () => {
  return (
    <LoadingContainer>
        <LoadingCircle/>
    </LoadingContainer>
  )
}

export default Loading