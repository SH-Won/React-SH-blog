import React, { MutableRefObject, useEffect, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import ArticleForm from '../components/Edit/ArticleForm';
import useArticleInfo from '../components/Edit/useArticleInfo';
import QuillEditor from '../components/Quill/QuillEditor';
import useQuillUpload from '../components/Quill/useQuillUpload';
import { userModifyArticle, userModifySelector, userState } from '../recoil/user';
import { ArticleTypes } from '../services/api';
import { StyledButton } from '../shared/shared.style';
import '../style_quill.css';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    margin: 0 auto;
`;
type ModifyType = {
    modify: boolean;
    article: ArticleTypes;
};

const EditPage: React.FC = (): React.ReactElement => {
    const userData = useRecoilValue(userState);
    const [{ article, modify },setUserModifyArticle] = useRecoilState(userModifyArticle);
    const resetUserModifyArticle = useResetRecoilState(userModifySelector);
    const articleInfo = useArticleInfo(article.title, article.category);
    const editorRef = useRef<ReactQuill | null>() as MutableRefObject<ReactQuill>;
    
    const uploadParams = {
        editor: editorRef,
        modify,
        title: articleInfo.title,
        selectedLanguage: articleInfo.selectedLanguage,
        userId: userData._id,
        article,
    };
    useEffect(() => {
      
        return () => {
            // setUserModifyArticle({
            //     modify:false,
            //     article: {
            //         category: 0,
            //         createdAt: '',
            //         data: '',
            //         favoriteCount: 0,
            //         imageIds: [],
            //         thumbnail: '',
            //         title: '',
            //         updatedAt: '',
            //         writer: {
            //             _id: '',
            //         },
            //         _id: '',
            //     },
            // })
            resetUserModifyArticle();
        }
    },[])
    const { handleUpload } = useQuillUpload(uploadParams);
    const editor = useMemo(() => {
         return <QuillEditor editorRef={editorRef} article={article} />
    },[])

    return (
        <Container>
            <ArticleForm {...articleInfo} />
            {/* <QuillEditor editorRef={editorRef} article={article} /> */}
            {editor}
            <StyledButton onClick={handleUpload}>Upload Item</StyledButton>
            <StyledButton>cancle</StyledButton>
        </Container>
    );
};

export default EditPage;
