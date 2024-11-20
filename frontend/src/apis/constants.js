export const LOCAL_STORAGE_TOKEN_NAME = process.env.NEXT_PUBLIC_LOCAL_STORAGE_TOKEN_NAME || 'BEAMIN'


// export const setHeaders = () => {
//     const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
//     const headers = {};

//     if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//     }

//     return headers;
// }

export const setHeaders = () => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    return token
        ? { headers: { 'Authorization': `Bearer ${token}` } }
        : {};
};