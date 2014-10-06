var Canvas = require('canvas');
var fs = require('fs');
var helpers = require('../lib/helpers.js');

var imagesDir = __dirname + '/../public/images/'
var supportedMemes = [];

fs.readdirSync(imagesDir).forEach(function(memeName) {
    supportedMemes.push(memeName.split('.')[0]);
});

exports.create = function(req, res) {

    var canvas = new Canvas(200,200);
    var context = canvas.getContext('2d');
    var fname;

    var memeNum = supportedMemes.indexOf(req.params.meme.toLowerCase());
    if (memeNum > -1) {
        fname = imagesDir + supportedMemes[memeNum] + '.jpg';
    } else {
        res.send(404, {
            'status': 'error',
            'message': 'meme not found'
        });
        return
    }

    fs.readFile(fname, function(error, meme) {
        if (error) throw error;

        img = new Canvas.Image;
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