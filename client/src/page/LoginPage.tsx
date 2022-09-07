import React from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import LoginForm from '../components/Login/LoginForm';
import useLogin from '../components/Login/useLogin';
import { loginUser } from '../services/api';
import { StyledButton } from '../shared/shared.style';

const Container = styled.div`
    height: 65vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const LoginButton = styled(StyledButton)`
    margin: 1rem;
    width: 80%;
    background-color: lightblue;
    color: black;
    align-self: center;
    max-width: 290px;
`;

const LoginPage = () => {
    const { email, password, onChangeEmail, onChangePassword, onSubmit } = useLogin();
    // const loginFormProps = useLogin();

    

    return (
        <Container>
            <LoginForm
                email={email}
                password={password}
                onChangeEmail={onChangeEmail}
                onChangePassword={onChangePassword}
                onSubmit={onSubmit}
            />
        </Container>
    );
};

export default LoginPage;
