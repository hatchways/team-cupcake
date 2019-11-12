const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  secretAccessKey: process.env.AMAZON_SECRET,
  accessKeyId: process.env.AMAZON_PUBLIC,
  region: "ca-central-1"
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "instafyuploads",
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

exports.upload = upload;
