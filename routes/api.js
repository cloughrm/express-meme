import path from 'path';
import cvs from 'canvas';

import { readdirSync, readFile } from 'fs';
import { wrapText } from '../lib/helpers.js';

// Get the list of supported meme images
const imagesDir = path.join(process.cwd(), 'public', 'images');
const supportedMemes = [];
readdirSync(imagesDir).forEach(function(memeName) {
    supportedMemes.push(memeName.split('.')[0]);
});

// Create a new meme
function create(req, res) {
    // Make this the requested meme is supported
    let requestedMeme = req.params.meme.toLowerCase();
    if (!supportedMemes.includes(requestedMeme)) {
        return res.status(404).json({
            'status': 'error',
            'message': 'meme not found'
        });
    }

    // Get the requested meme image
    let fname = path.join(imagesDir, `${requestedMeme}.jpg`);
    readFile(fname, function(error, meme) {
        if (error) throw error;

        // Create an image based on the meme image
        let img = new cvs.Image();
        img.src = meme;

        // Create the canvas
        const canvas = cvs.createCanvas(200, 200);
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        // Context settings
        context.drawImage(img, 0, 0, img.width, img.height);
        context.fillStyle = 'white';
        context.strokeStyle = 'black';
        context.textAlign = 'center';

        // Write the meme text
        if (req.params.topText) {
            wrapText(context, req.params.topText, 'top', canvas.height, canvas.width);
        }
        if (req.params.bottomText) {
            wrapText(context, req.params.bottomText, 'bottom', canvas.height, canvas.width);
        }

        // Send the meme to the client!
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end('<img src="' + canvas.toDataURL() + '" />');
    });

};

export default {create};