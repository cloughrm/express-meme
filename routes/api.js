const { createCanvas, Image } = require('canvas');
const fs = require('fs');
const helpers = require('../lib/helpers.js');

const imagesDir = __dirname + '/../public/images/'
const supportedMemes = [];

fs.readdirSync(imagesDir).forEach(function(memeName) {
    supportedMemes.push(memeName.split('.')[0]);
});

exports.create = function(req, res) {
    const canvas = createCanvas(200, 200);
    const context = canvas.getContext('2d');
    let fname;

    let memeNum = supportedMemes.indexOf(req.params.meme.toLowerCase());
    if (memeNum > -1) {
        fname = imagesDir + supportedMemes[memeNum] + '.jpg';
    } else {
        return res.send(404, {
            'status': 'error',
            'message': 'meme not found'
        });
    }

    fs.readFile(fname, function(error, meme) {
        if (error) throw error;

        let img = new Image();
        img.src = meme;

        canvas.width = img.width;
        canvas.height = img.height;

        context.drawImage(img, 0, 0, img.width, img.height);

        context.fillStyle = 'white';
        context.strokeStyle = 'black';
        context.textAlign = 'center';

        if (req.params.topText) {
            helpers.wrapText(context, req.params.topText, 'top', canvas.height, canvas.width);
        }
        if (req.params.bottomText) {
            helpers.wrapText(context, req.params.bottomText, 'bottom', canvas.height, canvas.width);
        }

        res.setHeader('Content-Type', 'text/html');
        res.writeHead(201);
        res.end('<img src="' + canvas.toDataURL() + '" />');
    });

};