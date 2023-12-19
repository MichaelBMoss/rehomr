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

module.exports = uploadFile;