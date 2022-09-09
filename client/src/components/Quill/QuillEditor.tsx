import React, { LegacyRef, MutableRefObject, useEffect, useRef, useState } from 'react'
import ReactQuill, { ReactQuillProps, UnprivilegedEditor } from 'react-quill/lib/index';
import 'react-quill/dist/quill.snow.css';
import { getItem } from '../../utils/storage';
import { StyledButton } from '../../shared/shared.style';
import styled from 'styled-components';

const modules = {
    toolbar : [
        [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['image', 'code-block'],
    ]
}
const formats = [
    'header',
    'bold','italic','underline','blockquoto',
    'list','bullet',
    'image','code-block'
]

const BlockEmbed = ReactQuill.Quill.import('blots/block/embed');
class ImageBlot extends BlockEmbed {
    static create(value : {url:string, id : string}) {
        let node = super.create();
        node.classList.add('image');
        const img = document.createElement('img');
        img.setAttribute('src', value.url);
        img.setAttribute('data-id', value.id);
        node.appendChild(img);
        return node;
    }
    static value(node : any) {
        return {
            id: node.firstChild.getAttribute('data-id'),
            url: node.firstChild.getAttribute('src'),
        };
    }
}
ImageBlot.blotName = 'image';
ImageBlot.tagName = 'figure';
ReactQuill.Quill.register(ImageBlot);


const uploadMulter = (ReactQuill : ReactQuill) => {
    const editor = ReactQuill.editor ;
    const input  = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('multiple', '');
    input.setAttribute('accept', 'image/*');
    input.style.fontSize = '16px';
    input.style.display = 'none';
    const editorRoot = document.querySelector('.ql-container.ql-snow') as HTMLElement;
    editorRoot.appendChild(input);

    // IOS 의 경우 실제 input 이 웹 DOM 어딘가에 존재해야 change가 trigger 됨
    input.addEventListener('change', async () => {
        const formData = new FormData();
        const token = getItem('token');
        const refreshToken = getItem('refreshToken');
        const files = input.files as FileList;
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }

        const res = await fetch(`${window.origin}/api/posts/uploadfiles`, {
            method: 'POST',
            headers: {
                // 'Content-Type':'multipart/form-data'
                // 'Content-Type':'multipart/x-www-form-urlencoded'
                authorization: token,
                refreshToken,
            },
            credentials: 'include',
            body: formData,
        });
        if (res.ok) {
            const { data } = await res.json();
            const range = editor?.getSelection()  as ReactQuill.Range ;
            
            let index  = range?.index as number;
            data.forEach(({ url } : {url : string}) => {
                const value = {
                    url: `${window.origin}${url}`,
                    id: '',
                };
                editor?.insertEmbed(index++ ,'image', value);
            });
            editor?.setSelection(++index, 0);
        }
        editorRoot.removeChild(input);
    });
    input.click();
    
}

const EditorContainer = styled.div`
display:flex;
flex-direction: column;
`
const QuillEditor = () => {
    const [value,setValue] = useState('');
    const quillRef = useRef<ReactQuill | null>() as MutableRefObject<ReactQuill> ;

    useEffect(() => {
        const {current} = quillRef;
        current.editor?.getModule('toolbar').addHandler('image', () =>{
            uploadMulter(current);
        })
    },[])

    const showContent = () => {
        const {current} = quillRef;
        console.log(current.editor?.getContents());
    }
    

  return (
    <EditorContainer>
    <ReactQuill ref={quillRef} theme='snow' value={value} onChange={setValue} modules={modules} formats={formats}/>
    <StyledButton onClick={showContent}>Show Content</StyledButton>
    </EditorContainer>
  )
}

export default QuillEditor