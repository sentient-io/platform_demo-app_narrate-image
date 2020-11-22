let data = {};
let state = {};

/* +---------------------+ */
/* | Toggle Popup Alert  | */
/* +---------------------+ */
toggleAlert = (alertTitle, alertMsg) => {
	$('#alertContent').html(alertMsg);
	$('#alertTitle').html(alertTitle);
	$('#alert').modal('toggle');
};

/* +-----------------+ */
/* | Main Functions  | */
/* +-----------------+ */
handleMainFunction = () => {
	loadingStart();
	$('#mainFunction, #btn-cancel').hide();
	$('#btn-restart').show();
	objectDetection(data.file.base64)
		.then(() => {
			if (Object.values(data.detectedObjects)[0]) {
				groupDetectedObjects(data.detectedObjects);
			} else {
				console.log('Nothing Detected');
			}
		})
		.then(() => {
			narrateDetectedObjects(data.detectedObjects);
		})
		.then(() => {
			textToSpeechENG(data.description).then(() => {
				$('#audioProcessingLoader').remove();
				createAudio(data.narration.audioContent).then((audio) => {
					$('#img-narration-description').append(audio);
				});
			});
			displayDescription(data.description);
			loadingEnd();
			inlineLoader({
				id: 'audioProcessingLoader',
				message: 'Processing Audio ...',
			}).then((loader) => {
				$('#img-narration-description').append(loader);
			});
		});
};

handleCancel = () => {
	console.log('Cancel image uploading');
	// Reset data and states
	data = {};
	state = {};
	// Clear uploaded file
	$('#single-pic-input').val('');
	// Clear image preview
	$('#s-img-preview').empty();
	$('#mainFunction, #btn-cancel').hide();
	$('#s-img-uploader').show();
	windowScrollTo(0);
};

handleRestart = () => {
	console.log('Restart');
	// Reset data and states
	data = {};
	state = {};
	// Clear uploaded file
	$('#single-pic-input').val('');
	$('#s-img-preview').empty();
	$('#s-img-uploader').show();
	$('#btn-restart').hide();
	windowScrollTo(0);
};

windowScrollTo = (position) => {
	// Scroll top
	window.scroll({
		top: position,
		left: 0,
		behavior: 'smooth',
	});
};
