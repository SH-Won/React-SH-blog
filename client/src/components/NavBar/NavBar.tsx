import React from 'react';
import { RouteLink, StyledButton } from '../../shared/shared.style';
import styled from 'styled-components';

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    padding:6px;
`;
const NavList = styled.ul`
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
`;
const ListItem = styled.li`
    font-weight: 650;
    font-size: 1.4rem;
    transform: rotateZ(-3deg);
    padding: 4px;
    margin: 8px;
    color: black;
    cursor: pointer;
    box-sizing: border-box;
`;

const NavBar = () => {
    return (
        <Nav>
            <NavList>
                <ListItem><RouteLink to='/' color='black'>sh blog</RouteLink></ListItem>
            </NavList>
            <NavList>
                <StyledButton>로그인</StyledButton>
                <StyledButton>회원가입</StyledButton>
            </NavList>
        </Nav>
    );
};

export default NavBar;
