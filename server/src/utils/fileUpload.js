const fs = require('fs');
const path = require('path');
const multer = require('multer');
const ServerError = require('../errors/ServerError');
const env = process.env.NODE_ENV || 'development';
const devFilePath = path.resolve(__dirname, '..', '..', 'public/images');

const filePath = env === 'production'
  ? '/var/www/html/images/'
  : devFilePath;

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  });
}

const storageContestFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, filePath);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const uploadFile = multer({ storage: storageContestFiles })

module.exports.uploadAvatar = async (req, res, next) => {
  uploadFile.single('file')(req, res, (err) => {
    if (err) {
      return next(new ServerError('Invalid file'))
    }
    if (req.file) {
      fs.rm(`${devFilePath}/${req.tokenData.avatar}`, (err) => {
        if (err) {
          console.log(`file not delete ${req.tokenData.avatar} because ${err}`)
        }
      })
    }
    return next();
  });

}
module.exports.uploadContestFiles = async (req, res, next) => {
  uploadFile.array('files', 3)(req, res, (err) => {
    if (err) {
      return next(new ServerError('Invalid file'))
    }
    return next()
  });
}
module.exports.updateContestFile = uploadFile.single('file');
module.exports.uploadLogoFiles = uploadFile.single('offerData');

