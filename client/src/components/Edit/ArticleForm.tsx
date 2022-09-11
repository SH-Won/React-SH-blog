import React from 'react';
import styled from 'styled-components';
import { languages } from '../../utils/languages';
const Container = styled.div`
    display: flex;
    justify-content: space-between;
`;
const TitleInput = styled.input`
    width: 70%;
    font-size: 1.4rem;
`;
const LanguageSelect = styled.select``;
const Option = styled.option`
    width: 10%;
`;
type FormType = {
    title: string;
    selectedLanguage : number
    handleChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectLanguage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
const ArticleForm = ({ title, selectedLanguage ,handleChangeTitle, handleSelectLanguage }: FormType) => {
    return (
        <Container>
            <TitleInput type="text" value={title} onChange={handleChangeTitle} />
            <LanguageSelect onChange={handleSelectLanguage} value={selectedLanguage}>
                <Option defaultValue={0}>선택</Option>
                {languages.map(lang => (
                    <Option key={lang.name} value={lang._id} >
                        {lang.name}
                    </Option>
                ))}
            </LanguageSelect>
        </Container>
    );
};

export default ArticleForm;
