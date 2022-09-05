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
