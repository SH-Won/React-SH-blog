import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { removeItem } from './../../utils/storage';
import { logOutUser } from '../../services/api';
import { loginState } from '../../recoil/user';

const useLogout = () => {
    const navigate = useNavigate();
    const setloginState = useSetRecoilState(loginState);

    const handleLogout = async () => {
        const response = await logOutUser();
        console.log(response);
        if (response.success) {
            setloginState(false);
            removeItem('loginSuccess');
            removeItem('token');
            removeItem('refreshToken');
            navigate('/');
        }
    };

    return {
        handleLogout,
    };
};

export default useLogout;
