// routes/api/upload.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // this saves files to an 'uploads' folder
const s3 = require("../../config/s3");
const uuid = require("uuid");
const fs = require("fs");

router.post("/", upload.single("file"), (req, res) => {
    console.log(req.file);
	// req.file contains information about the uploaded file
	const fileContent = fs.readFileSync(req.file.path);
	const params = {
		Bucket: process.env.S3_BUCKET_NAME,
		Key: uuid.v4(), // File name you want to save as in S3
		Body: fileContent,
	};
	// Uploading files to the bucket
    s3.upload(params, function (err, data) {
        console.log(data);
		if (err) {
			res.status(500).send(err);
		}
		res
			.status(200)
			.send("File uploaded successfully. File URL:" + data.Location);
	});
});

module.exports = router;
