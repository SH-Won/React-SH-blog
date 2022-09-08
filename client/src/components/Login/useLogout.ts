import { useNavigate } from 'react-router-dom';
import { removeItem } from './../../utils/storage';
import { useMutation,  useQueryClient } from 'react-query';
import { logOutUser } from '../../services/api';

const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate,isLoading} = useMutation('userLogout',logOutUser,{
        onSuccess : (data,variables,context) => {
            // queryClient.setQueryData('loginUser',null);
            queryClient.removeQueries('loginUser');
             removeItem('token');
             removeItem('refreshToken');
             removeItem('loginSuccess');
             navigate('/');
        }
    });


  return {
    mutate
  }
}

export default useLogout