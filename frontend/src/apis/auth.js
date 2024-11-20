import { setHeaders } from './constants';
import createInstance from './index';

const api = createInstance(process.env.NEXT_PUBLIC_API_URL);

export const register = ({ email, password }) => {
    return api.post('/auth/register', { email, password });
};

export const login = ({ email, password }) => {
    return api.post('/auth/login', { email, password });
};

export const registerAdmin = ({ email, password }) => {
    return api.post('/auth/register-admin', { email, password });
};

export const loadUserByToken = () => {
    return api.get('/auth/load-user', setHeaders());
};