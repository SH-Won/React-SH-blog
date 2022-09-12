import { AxiosPromise } from 'axios';
import React from 'react';
import { UseMutateFunction } from 'react-query';
import styled from 'styled-components';
import { StyledButton } from '../../shared/shared.style';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;

    margin: 0 auto;
`;
const Input = styled.input`
    border-radius: 6px;
    outline: none;
    border: 1px solid gray;
    font-size: 1rem;
    padding: 0.3rem;
    max-width: 300px;
`;
const Label = styled.label`
    padding: 0.5rem 0;
`;
const LoginButton = styled(StyledButton)`
    margin: 1rem;
    width: 80%;
    background-color: lightblue;
    color: black;
    align-self: center;
    max-width: 290px;
`;

type LoginFormProps = {
    email: string;
    password: string;
    onChangeEmail: (e: React.FormEvent<HTMLInputElement>) => void;
    onChangePassword: (e: React.FormEvent<HTMLInputElement>) => void;
    // onSubmit : (e:React.FormEvent) => void;
    onSubmit: (e: React.FormEvent) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ email, password, onChangeEmail, onChangePassword, onSubmit }) => {
    return (
        <>
            <Form onSubmit={onSubmit}>
                <Label htmlFor="이메일">이메일</Label>
                <Input type="text" value={email} onChange={onChangeEmail} />
                <Label htmlFor="비밀번호">비밀번호</Label>
                <Input type="password" value={password} onChange={onChangePassword} />
            </Form>
            <LoginButton onClick={onSubmit}>로그인</LoginButton>
        </>
    );
};

export default LoginForm;
