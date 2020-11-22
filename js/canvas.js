console.log('Canvas.js Ready');
console.log(new Date().getTime() - loadTime);

/* +----------------------+ */
/* | Draw image to canvas | */
/* +----------------------+ */
canvasDrawImage = (base64string, sWidth, sHeight, resize = 100) => {
	// Takes base64string, source Width and Height
	// Resize will be the size of rendered canvas
	let dWidth;
	let dHeight;
	if (sWidth >= sHeight) {
		// When image is landscape
		dWidth = resize;
		dHeight = sHeight * data.file.resizeRatio;
	} else {
		// When image is portrait
		dHeight = resize;
		dWidth = sWidth * data.file.resizeRatio;
	}

	let canvas = document.createElement('canvas');
	canvas.setAttribute('width', dWidth);
	canvas.setAttribute('height', dHeight);

	let ctx = canvas.getContext('2d');

	var image = new Image();
	image.onload = () => {
		ctx.drawImage(image, 0, 0, sWidth, sHeight, 0, 0, dWidth, dHeight);
	};
	image.src = base64string;

	return canvas;
};
