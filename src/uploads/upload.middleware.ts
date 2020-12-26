import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        return callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        return callback(null, `${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
});

const uploadMiddleware = multer({ storage });

export default uploadMiddleware;
