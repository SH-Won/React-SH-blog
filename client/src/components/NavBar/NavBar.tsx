import React from 'react';
import { RouteLink, StyledButton } from '../../shared/shared.style';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import useLogout from '../Login/useLogout';
import { RecoilState, useRecoilValue } from 'recoil';
import { loginState } from '../../recoil/user';
import { User } from '../../hoc/Auth';

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 6px;
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

const UserStateLogin = () => {
    const { handleLogout } = useLogout();
    return (
        <NavList>
            <StyledButton onClick={handleLogout}>
                <RouteLink to="/logout" color="inherit">
                    로그아웃
                </RouteLink>
            </StyledButton>
        </NavList>
    );
};
const UserStateNotLogin = () => {
    return (
        <NavList>
            <StyledButton>
                <RouteLink to="/login" color="inherit">
                    로그인
                </RouteLink>
            </StyledButton>
            <StyledButton>
                <RouteLink to="/register" color="inherit">
                    회원가입
                </RouteLink>
            </StyledButton>
        </NavList>
    );
};

type LoginUser = {
    loginSuccess: boolean;
    token: string;
    refreshToken: string;
};

const NavBar = () => {
    const isLogin = useRecoilValue(loginState);
    console.log(isLogin);

    return (
        <Nav>
            <NavList>
                <ListItem>
                    <RouteLink to="/" color="black">
                        sh blog
                    </RouteLink>
                </ListItem>
            </NavList>
            {isLogin ? <UserStateLogin /> : <UserStateNotLogin />}
        </Nav>
    );
};

export default NavBar;
