import React, { useState } from 'react';

const useArticleInfo = (initTitle: string, initSelected: number) => {
    const [title, setTitle] = useState(initTitle);
    const [selectedLanguage, setSeletedLanguage] = useState(initSelected);
    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleSelectLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.tagName !== 'SELECT') return;
        setSeletedLanguage(Number(e.target.value));
    };
    return {
        title,
        selectedLanguage,
        handleChangeTitle,
        handleSelectLanguage,
    };
};

export default useArticleInfo;
