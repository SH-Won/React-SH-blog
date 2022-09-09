import React, { LegacyRef, MutableRefObject, useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill/lib/index';
import 'react-quill/dist/quill.snow.css';
import { getItem } from '../../utils/storage';

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


const uploadMulter = (editor : React.RefObject<ReactQuill>) => {
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
        for (let i = 0; i < input.files.length; i++) {
            formData.append('file', input.files[i]);
        }

        const res = await fetch(`${ENDPOINT}/api/posts/uploadfiles`, {
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
            const range = editor.getSelection();
            data.forEach(({ url }) => {
                const value = {
                    url: `${ENDPOINT}${url}`,
                    id: '',
                };
                editor.insertEmbed(range.index++, 'image', value);
            });
            editor.setSelection(++range.index, 0);
        }
        editorRoot.removeChild(input);
    });
    input.click();
    
}

const QuillEditor = () => {
    const [value,setValue] = useState('');
    const quillRef = useRef<ReactQuill | null>(null);

    useEffect(() => {

    },[])

    

  return (
    <ReactQuill ref={quillRef} theme='snow' value={value} onChange={setValue} modules={modules} formats={formats}/>
  )
}

export default QuillEditor