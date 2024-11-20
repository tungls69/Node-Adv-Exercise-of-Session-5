import { setHeaders } from './constants';
import createInstance from './index';

const api = createInstance(process.env.NEXT_PUBLIC_API_URL);

export const createCategory = ({ name }) => {
    return api.post('/food/categories', { name }, setHeaders());
};

export const getCategories = () => {
    return api.get('/food/categories');
};


export const createFood = (foodData) => {
    return api.post('/food', foodData, setHeaders());
};

export const getFoods = (page, category, limit, search) => {
    const params = {
        page,
        limit,
        category,
        search
    };
    return api.get('/food', { params });
};


