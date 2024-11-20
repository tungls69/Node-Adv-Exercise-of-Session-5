import { setHeaders } from './constants';
import createInstance from './index';

const api = createInstance(process.env.NEXT_PUBLIC_API_URL);

export const createOrder = (data) => {
    return api.post('/order', { items: data }, setHeaders());
};


export const getOrders = (page = 1, limit = 10) => {
    const queryParams = {
        params: {
            page,
            limit,

        },
        ...setHeaders()
    };
    return api.get('/order', queryParams);
};
