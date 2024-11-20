import axios from "axios";

const createInstance = (baseURL) => {
    const instance = axios.create({
        baseURL,
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            // Xử lý lỗi ở đây, có thể throw error mới để bắt lớp ngoại lệ ở component.
            throw error;
        }
    );

    return instance;
};

export default createInstance;
