const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');

const target_dir_path = '../../images/uploaded';

function saveImage(srcPath, destPath, fileName) {
    fs.mkdir(destPath, { recursive: true }, (err) => {
        if (err) throw err;
        fs.rename(srcPath, destPath + "/" + fileName, (err) => {
            if (err) throw err;

            console.log('file', fileName, 'saved!');
        });
    });
}

module.exports = function upload(req, res) {
    const form = new IncomingForm();

    form.on('file', (field, file) => {
        console.log('file', file.name);
        console.log('file', file.path);

        saveImage(file.path, target_dir_path, file.name);

    });

    form.on('end', () => {
        res.json();
    });

    form.parse(req);
};  