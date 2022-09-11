import React, { MutableRefObject } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userModifyArticle, userState } from '../../recoil/user';
import { ArticleTypes, uploadCloudinary } from '../../services/api';
import { getImageURL } from '../../utils/languages';
// React.Ref<ReactQuill | null>
const useQuillUpload = (editor: MutableRefObject<ReactQuill>, modify : boolean) => {
    const navigate = useNavigate();
    const userData = useRecoilValue(userState);
    const {article} = useRecoilValue(userModifyArticle);
    const {current} = editor as MutableRefObject<ReactQuill>
    const show = async () => {

        console.log(editor);
        return;
        const { current } = editor as MutableRefObject<ReactQuill>;
        console.log(current.editor?.getContents());

        const imgElements = current.editor?.root.querySelectorAll('.image > img') as NodeListOf<HTMLImageElement>;
        const addImgElements : HTMLImageElement[] = [];
        const imageIds : string [] = [];
        const paths : string [] = [];
        const removeIds : string [] = [...article.imageIds];
        imgElements.forEach( element  => {
            const { id } = element.dataset;
            if (!id) {
                const path = element.src.split('/').pop() as string;
                paths.push(path);
                addImgElements.push(element);
            } else {
                const index = removeIds.indexOf(id);
                if (index > -1) {
                    removeIds.splice(index, 1);
                    imageIds.push(id);
                }
            }
        });

        let isUpload = Promise.resolve();
        if (addImgElements.length !== 0) {
            const data = {
                userId : userData._id,
                paths,
            };
            await uploadCloudinary(data)
                .then(data => {
                    addImgElements.forEach((element , index) => {
                        const { url, id } = data[index];
                        const parentElement = element.parentElement as HTMLElement
                        parentElement.className = 'image';
                        element.src = url;
                        element.setAttribute('data-id', id);
                        imageIds.push(id);
                    });
                    return Promise.resolve();
                })
                .catch(err => console.log(err));
        }
        isUpload
            .then(response => {
                // const data = {
                    
                //     writer: userData._id,
                //     title: this.state.title,
                //     data: current.editor?.root.innerHTML
                //     category: this.state.selectedLanguage,
                //     thumbnail: getImageURL(this.state.selectedLanguage),
                //     imageIds,
                //     removeIds,
                    
                // };
                // if (modify) {
                //     data._id = article._id;
                //     return updateArticle(data);
                // }
                // return uploadArticle(data);
            })
            .then(async response => {

                navigate('/recent');
            });
    };

    const singleImageUpload = () => {};

    const upload = () => {};
    return {
        show,
    };
};

export default useQuillUpload;
