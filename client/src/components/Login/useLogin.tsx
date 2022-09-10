import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { loginState } from '../../recoil/user';
import { loginUser } from '../../services/api';
import { setItem } from '../../utils/storage';

const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
    const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null);

    const setLoginState = useSetRecoilState(loginState);

    const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    };
    const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    };
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // login logic send server user info
        // and route change
        console.log('login submit');
        const params = {
            email,
            password,
        };
        const response = await loginUser(params);
        const { token, loginSuccess, refreshToken } = response;
        console.log(response);
        setLoginState(response.loginSuccess);
        setItem('token', token);
        setItem('refreshToken', refreshToken);
        setItem('loginSuccess', loginSuccess);

        navigate('/');
    };

    return {
        email,
        password,
        onChangeEmail,
        onChangePassword,
        onSubmit,
    };
};

export default useLogin;
