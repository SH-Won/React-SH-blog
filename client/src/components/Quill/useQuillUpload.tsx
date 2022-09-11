import { MutableRefObject } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import { ArticleTypes, deleteArticle, updateArticle, uploadArticle, UploadArticleData, uploadCloudinary } from '../../services/api';
import { getImageURL } from '../../utils/languages';
// React.Ref<ReactQuill | null>
interface UploadProps {
    editor: MutableRefObject<ReactQuill>;
    modify: boolean;
    title: string;
    selectedLanguage: number;
    userId: string;
    article: ArticleTypes;
}
const useQuillUpload = ({ editor, modify, title, selectedLanguage, userId, article }: UploadProps) => {
    const navigate = useNavigate();

    const handleUpload = async () => {

        const { current } = editor as MutableRefObject<ReactQuill>;


        const imgElements = current.editor?.root.querySelectorAll('.image > img') as NodeListOf<HTMLImageElement>;
        const addImgElements: HTMLImageElement[] = [];
        const imageIds: string[] = [];
        const paths: string[] = [];
        const removeIds: string[] = [...article.imageIds];
        imgElements.forEach(element => {
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
                userId,
                paths,
            };
            await uploadCloudinary(data)
                .then(response => {
                    console.log(response);
                    addImgElements.forEach((element, index) => {
                        const { url, id } = response.data[index];
                        console.log(url,id);
                        const parentElement = element.parentElement as HTMLElement;
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
                const data: UploadArticleData = {
                    writer: userId,
                    title,
                    data: current.editor?.root.innerHTML as string,
                    category: selectedLanguage,
                    thumbnail: getImageURL(selectedLanguage) as string,
                    imageIds,
                    removeIds,
                };
                console.log(data);
                if (modify) {
                    data._id = article._id;
                    return updateArticle(data);
                }
                return uploadArticle(data);
            })
            .then(async response => {
                // navigate('/recent');
            });
    };

    return {
        handleUpload,
    };
};

export default useQuillUpload;
