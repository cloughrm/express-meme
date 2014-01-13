
/**
 * Draws meme style text on HTML5 canvas. This function was built
 * on top of an example from: 
 * http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
 *
 * @param {object} context - 2d HTML5 canvas context
 * @param {sting} text - The meme text to be drawn on the image
 * @param {string} location - Location of the text, must be 'top' or 'bottom'
 * @param {number} height - Height of image
 * @param {number} width - Width of image
 * @param {number} fontSize - (Optional) Size of text, dafault is 60 down to 35
 * @return {boolean} Status of function, true if successful
 */
exports.wrapText = function(context, text, location, height, width, fontSize) {

    // Vars
    var words = text.toUpperCase().split(' '),
        maxWidth = width,
        x = width / 2,
        minFontSize = 35,
        line = '',
        lineHeight,
        y;

    // Figure out font size and line height
    if (fontSize === undefined) { fontSize = 60; }
    if (location == 'top') {
        y = fontSize + (height/50);
        lineHeight = fontSize;
    } else if (location === 'bottom') {
        y = height - (fontSize*.5 - (height/50));
        lineHeight = fontSize * -1;
    } else {
        // location must be 'top' or 'bottom'
        return false;
    }

    // Set canvas font
    context.font = fontSize + 'px Impact';
    context.lineWidth = 2.5;

    // Loop through all the words 
    for(var n = 0; n < words.length; n++) {

        // If top, start with the first word, append next word, etc
        // If bottom, start with last word, append second to last, etc
        var testLine = '';
        if (location === 'top') { testLine = line + words[n] + ' '; }
        else { testLine = ' ' + words[words.length-1-n] + line; }

        // If line + next word is too big, then line is the right width
        if (context.measureText(testLine).width > maxWidth && n > 0) {

            // If theres more words then we can fit, try again with smaller
            // font, until we hit minimum font size
            if (words.length > n && fontSize > minFontSize) {
                exports.wrapText(context, text, location, height, width, fontSize-1);
                return;
            }

            // Draw the line of text
            context.fillText(line.trim(), x, y);
            context.strokeText(line.trim(), x, y);
            
            // Reset line with next word
            if (location === 'top') { line = words[n] + ' '; } 
            else { line =  ' ' + words[words.length-1-n]; }

            // Move our y position to the next line
            y += lineHeight;

        }

        // We can fit another word on the current line
        else { line = testLine; }

    }

    // Draw last line of text / first line if text fits in one line
    context.fillText(line.trim(), x, y);
    context.strokeText(line.trim(), x, y);

    // Success, return true
    return true;

}