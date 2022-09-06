import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Figure = styled.figure<{ ratio: number }>`
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: ${props => `${props.ratio * 100}%`};
    margin: 0;
`;
export const Image = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;
export const Button = styled.button<{ backgroundColor: string }>`
    outline: none;
    background-color: ${props => props.backgroundColor};
`;
export const StyledButton = styled.button`
padding: 8px;
margin: 8px;
border-radius: 0.6rem;
background-color: #d5f7e7;
color: #015834;
border: none;
cursor: pointer;
`;
export const RouteLink = styled(Link)<{color?:string}>`
    color : ${props => props.color};
    text-decoration: none;
    width:100%;
`