import React, { MutableRefObject, useLayoutEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from '../../page/LandingPage';
import styled, { css } from 'styled-components';
import { RouteLink } from '../../shared/shared.style';

const Tab = styled.ul`
    width: 150px;
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
    display: flex;
    margin: 1rem;
`;
const TabItem = styled.li`
    width: 50%;
    font-size: 1.5rem;
    padding: 0.5rem;
    text-align: center;
`;
const TabUnderLine = styled.div<{ pathname: string }>`
    width: 50%;
    height: 4px;
    border-radius: 50px;
    background-color: #d5f7e7;
    position: absolute;
    bottom: 0;
    ${props =>
        props.pathname === '/'
            ? css`
                  left: 0%;
                  transform: translate3d(0%, 0, 0);
                  transition: transform 1s;
              `
            : css`
                  left: 0%;
                  transform: translate3d(100%, 0, 0);
                  transition: transform 1s;
              `}
`;

const LandingTab = () => {
    const tabRef = useRef() as MutableRefObject<HTMLUListElement>;
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        const { current } = tabRef;
        const listItemCount = current.childNodes.length - 1;
    }, []);

    return (
        <>
            <Tab ref={tabRef}>
                <TabItem>
                    <RouteLink to={'/'} color={'black'}>
                        인기
                    </RouteLink>
                </TabItem>
                <TabItem>
                    <RouteLink to={'/recent'} color={'black'}>
                        최신
                    </RouteLink>
                </TabItem>
                <TabUnderLine pathname={pathname} />
            </Tab>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/recent" element={<LandingPage />} />
            </Routes>
        </>
    );
};

export default LandingTab;
