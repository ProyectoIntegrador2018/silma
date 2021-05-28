import config from "../config/config";

const AWS = require("aws-sdk");

//Funcion que obtiene un documento de AWS S3
export const getDocument = async (id) => {
  const params = { Bucket: config.AWS_BUCKET + "/Texts", Key: id + ".md" };
  var s3 = new AWS.S3();
  return new Promise((resolve, reject) => {
    s3.getObject(params, function(err, data) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(data);
    });
  });
};

//Funcion que sube un documento a AWS S3
export const uploadDocument = async (id, data) => {
  var s3 = new AWS.S3({
    params: { Bucket: config.AWS_BUCKET + "/Texts", Key: "", Body: "" }
  });
  var params = {
    Key: id,
    Body: data
  };
  s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
  });
};


//Funcion que obtiene una imagen de AWS S3
export const getImage = async (id) => {
  const params = { Bucket: config.AWS_BUCKET + "/Images", Key: id + ".png" };
  var s3 = new AWS.S3({credentials:{secretAccessKey: config.AWS_SECRET_ACCESS_KEY, accessKeyId: config.AWS_ACCESS_KEY_ID},});
  return new Promise((resolve, reject) => {
    s3.getObject(params, function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
