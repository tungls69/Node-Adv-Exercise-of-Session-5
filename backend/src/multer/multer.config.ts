import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
    storage: diskStorage({
        destination: './public/images/foods',
        filename: (req, file, callback) => {

            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            callback(null, `${uniqueSuffix}${ext}`);
        },
    }),
};

export const multerOptions = {
    limits: {
        fileSize: 5 * 1024 * 1024, // Giới hạn kích thước file 5MB
    },
    fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            // Chỉ chấp nhận file ảnh
            return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
    },
};
