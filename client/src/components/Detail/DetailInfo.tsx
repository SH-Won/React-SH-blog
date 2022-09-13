import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import UserFavoriteButton from './UserFavoriteButton';

const DetailInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Time = styled.time`
    align-self: flex-end;
    font-size: 0.7rem;
`;

interface InfoProps {
    title: string;
    time: string;
}
const DetailInfo: React.FC<InfoProps> = ({ title, time }) => {
    return (
        <DetailInfoContainer>
            <h1>{title}</h1>
            <Time>{time}</Time>
        </DetailInfoContainer>
    );
};

export default DetailInfo;
