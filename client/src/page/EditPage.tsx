import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import QuillEditor from '../components/Quill/QuillEditor';
import { userState } from '../recoil/user';

const Container = styled.div`
display:flex;
flex-direction: column;
width:95%;
margin:0 auto;
`
const EditPage: React.FC = (): React.ReactElement => {
    const userData = useRecoilValue(userState);
    console.log(userData);
    return (
        <Container>
            <QuillEditor />
        </Container>
    );
};

export default EditPage;
