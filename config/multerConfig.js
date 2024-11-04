import multer from "multer";
import slugify from "slugify";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const safeFilename = slugify(Date.now() + '-' + file.originalname, {
            replacement: '_',
            remove: /[^a-zA-Z0-9._-]/g,
            lower: false,
        });
        cb(null, safeFilename);
    }
});

export const upload = multer({ storage: storage });