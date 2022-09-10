import React, { MutableRefObject } from 'react';
import ReactQuill from 'react-quill';
import { uploadCloudinary } from '../../services/api';

const useQuillUpload = (editor: React.Ref<ReactQuill | null>) => {
   
    const show = async () => {
        const { current } = editor as MutableRefObject<ReactQuill>;
        console.log(current.editor?.getContents());

        const imgElements = current.editor?.root.querySelectorAll('.image > img') as NodeListOf<HTMLImageElement>;
        const addImgElements : HTMLImageElement [] = [];
        const imageIds : string [] = [];
        const paths : string [] = [];
        // const removeIds : string [] = [...this.state.imageIds];
        imgElements.forEach( element  => {
            const { id } = element.dataset;
            if (!id) {
                const path = element.src.split('/').pop() as string;
                paths.push(path);
                addImgElements.push(element);
            } else {
                // const index = removeIds.indexOf(id);
                // if (index > -1) {
                    // removeIds.splice(index, 1);
                    // imageIds.push(id);
                // }
            }
        });

        // let isUpload = Promise.resolve();
        // if (addImgElements.length !== 0) {
        //     const data = {
        //         userId: user._id,
        //         paths,
        //     };
        //     await uploadCloudinary(data)
        //         .then(response => {
        //             addImgElements.forEach((element, index) => {
        //                 const { url, id } = response.data[index];
        //                 element.parentNode.className = 'image';
        //                 element.src = url;
        //                 element.setAttribute('data-id', id);
        //                 imageIds.push(id);
        //             });
        //             return Promise.resolve();
        //         })
        //         .catch(err => console.log(err));
        // }
        // isUpload
        //     .then(response => {
        //         const data = {
        //             writer: user._id,
        //             title: this.state.title,
        //             data: this.editor.root.innerHTML,
        //             category: this.state.selectedLanguage,
        //             thumbnail: getImageURL(this.state.selectedLanguage),
        //             imageIds,
        //             removeIds,
        //         };
        //         if (isModify) {
        //             data['_id'] = this.state._id;
        //             return updateArticle(data);
        //         }
        //         return uploadArticle(data);
        //     })
        //     .then(async response => {
        //         loading.setState(false);
        //         changeRoute('/recent', { detail: { upload: true } });
        //     });
    };

    const singleImageUpload = () => {};

    const upload = () => {};
    return {
        show,
    };
};

export default useQuillUpload;
