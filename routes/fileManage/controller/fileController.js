var express = require('express');
var router = express.Router();
const fileService = require('../service/fileService')

router.post('/', async (req, res, next) => {
  res.redirect('/');
  res.status(200).json(await fileService.uploadFile(req))
});

router.get('/:fileName', async (req, res, next) => {
  const fileData = await fileService.downloadFile(req);
  const fileName = 'image.png'
  const fileType = 'image/png'

  res.redirect('/');
  res.writeHead(200, {
    'Content-Disposition': `attachment; filename="${fileName}"`,
    'Content-Type': fileType,
  })

  const download = Buffer.from(fileData, 'base64')
  res.end(download)
});

module.exports = router;