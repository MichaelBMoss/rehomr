const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // this saves files to an 'uploads' folder
const s3 = require("../../config/s3");
const uuid = require("uuid");
const fs = require("fs");

function uploadFile(req, res) {
    return new Promise((resolve, reject) => {
        upload.single("file")(req, res, (err) => {
            if (err) {
                reject(err);
            }
            if (!req.file) {
                reject(new Error('No file found'));
            }

            const fileContent = fs.readFileSync(req.file.path);
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: uuid.v4(), // File name you want to save as in S3
                Body: fileContent,
            };

            s3.upload(params, function (err, data) {
                fs.unlinkSync(req.file.path);
                if (err) {
                    reject(err);
                }
                resolve(data.Location);
            });
        });
    });
}

function uploadFileUpdate(req, res) {
    return new Promise((resolve, reject) => {
        upload.single("file")(req, res, (err) => {
            if (err) {
                return reject(err);
            }

            // If no file is found in the request, resolve the promise without error
            if (!req.file) {
                return resolve({ message: 'No file uploaded', fileUploaded: false });
            }

            const fileContent = fs.readFileSync(req.file.path);
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: uuid.v4(), // File name you want to save as in S3
                Body: fileContent,
            };

            s3.upload(params, function (err, data) {
                fs.unlinkSync(req.file.path); // Clean up the temporary file
                if (err) {
                    return reject(err);
                }
                resolve({ location: data.Location, fileUploaded: true });
            });
        });
    });
}

module.exports = {
    uploadFile,
    uploadFileUpdate
};
