const fs = require('fs');
const sharp = require('sharp');

module.exports = {
    uploadFile: (req) => {
        return new Promise((resolve, reject) => {
            if (!req.files) {
                reject("File was not found");
            }
            const file = req.files.file;
            const filePath = `${__dirname}/../uploads/${file.name}`
            file.mv(filePath, (err) => {
                if (err) {
                    reject(err);
                }
                resolve({
                    filePath: filePath,
                    status: "success",
                    message: "File was successfully uploaded"
                });
            });
        })
    },
    downloadFile: async (req) => {
        const filePath = `${__dirname}/../uploads/${req.query.fileName}`
        const semiTransparentRedPng = await sharp(filePath).resize(Number(req.query.height),Number(req.query.width)).png().toBuffer();
        return semiTransparentRedPng

    }
}