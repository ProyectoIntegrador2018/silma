var AWS = require("aws-sdk");

export const getDocument = async(id) => {
    const params =  { Bucket: process.env.AWS_BUCKET + '/Texts', Key: id + ".md" }
    var s3 = new AWS.S3();
    return new Promise((resolve, reject) => {
        s3.getObject(params,function(err,data){
            if(err){
                console.log(err)
                reject(err)
            }
            resolve(data)
        })
    });
}

export const uploadDocument = async (id,data) => {
    var s3 = new AWS.S3({params: { Bucket: process.env.AWS_BUCKET + '/Texts', Key: '', Body: ''}});
    var params = {
        Key: id,
        Body: data
    }
    s3.upload(params,function(err,data){
        if(err){
            throw err
        }
    });
}