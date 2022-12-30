const express = require('express')
const router = express.Router()
const { upload } = require('../services/s3Services');

//console.log("sjdlsc",upload);
router.post('/uploadimage', upload.single('image'), (req, res) => {
  if (!req.files) res.status(400).json({ error: 'No files were uploaded.' })
    console.log("files uploaded",req);
  res.status(201).json({
    message: 'Successfully uploaded ' + req.files.length + ' files!',
    files: req.files
  })
})

module.exports = router