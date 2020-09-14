/**
 * Config storage for uploaded files
 */

import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  /*     dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.resolve(__dirname, '..', '..', 'temp', 'uploads'));
    
            },
            filename: async (req, file, cb) => {
                const hash = await crypto.randomBytes(14).toString('hex');
                const fileName = `${hash}-${file.originalname}`;
                cb(null, fileName);
            }
        }),
        limits: {
            fileSize: 2 * 1024 * 1024
        } */
};
