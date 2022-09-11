import React, { MutableRefObject, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import ArticleForm from '../components/Edit/ArticleForm';
import useArticleInfo from '../components/Edit/useArticleInfo';
import QuillEditor from '../components/Quill/QuillEditor';
import useQuillUpload from '../components/Quill/useQuillUpload';
import { userModifyArticle, userState } from '../recoil/user';
import { ArticleTypes } from '../services/api';
import { StyledButton } from '../shared/shared.style';
import '../style_quill.css';

const Container = styled.div`
display:flex;
flex-direction: column;
width:95%;
margin:0 auto;
`
type ModifyType = {
    modify: boolean;
    article : ArticleTypes
}

const EditPage: React.FC = (): React.ReactElement => {
    const userData = useRecoilValue(userState);
    const {article,modify} = useRecoilValue(userModifyArticle); 
    const articleInfo = useArticleInfo(article.title,article.category);
    const editorRef = useRef<ReactQuill|null>() as MutableRefObject<ReactQuill>
    const {show} = useQuillUpload(editorRef,modify);
    
    
    console.log(article,modify);
    return (
        <Container>
            <ArticleForm {...articleInfo}/> 
            <QuillEditor editorRef={editorRef} article={article} />
            <StyledButton onClick={show}>Show Content</StyledButton>
            <StyledButton>Upload Item</StyledButton>
        </Container>
    );
};

export default EditPage;
