import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import QuillEditor from '../components/Quill/QuillEditor';
import { userModifyArticle, userState } from '../recoil/user';
import { ArticleTypes } from '../services/api';
import '../style_quill.css';

const Container = styled.div`
display:flex;
flex-direction: column;
width:95%;
margin:0 auto;
`
type ModifyType = {
    modify: boolean;
    article : ArticleTypes | null;
}

const EditPage: React.FC = (): React.ReactElement => {
    const userData = useRecoilValue(userState);
    const {article,modify} = useRecoilValue<ModifyType>(userModifyArticle); 
    console.log(article,modify);
    return (
        <Container>
            <QuillEditor article={article} modify={modify} />
        </Container>
    );
};

export default EditPage;
