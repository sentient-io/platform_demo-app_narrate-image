console.log('Text To Speech (ENG) Ready');
console.log(new Date().getTime() - loadTime);

/* +-------------------------------+ */
/* | Call Text To Speech (ENG) API | */
/* +-------------------------------+ */

textToSpeechENG = (text) => {
	return new Promise((resolve, reject) => {
		console.log('Start Calling Text To Speech (ENG) API');

		$.ajax({
			method: 'POST',
			url:
				'https://apis.sentient.io/microservices/voice/ttseng/v0.1/getpredictions',
			headers: { 'x-api-key': apikey, 'Content-Type': 'application/json' },
			data: JSON.stringify({ text: text }),
			success: (result) => {
				console.log('Text to Speech (ENG) API : Successfully Processed');
				data.narration = result;
				resolve(result);
			},
			error: (err) => {
				loadingEnd();
				let errTitle = `Error : ${err.status}`;
				let errMsg = JSON.parse(err.responseText).message;
				toggleAlert(errTitle, errMsg);
				// Clear record of uploaded file
				console.log(err);
			},
		});
	});
};

/* +----------------------+ */
/* | Create Audio Element | */
/* +----------------------+ */
createAudio = (base64) => {
	console.log('Creating Audio Element');
	return new Promise((resolve, reject) => {
		let audioContainer = document.createElement('div');
		let audio = document.createElement('audio');
		audio.innerHTML = `<source src="data:audio/wav;base64,${base64}" /> Your browser does not suppost audio eleemnt.`;
		Object.assign(audio, {
			controls: 'controls',
			autobuffer: 'autobuffer',
			id: 'audio',
		});
		//Create a play audio button
		let playBtn = createPlayBtn();

		$(playBtn).attr('onclick', 'playAudio("audio")');

		$(audio).hide();
		$(audioContainer).append(audio);
		$(audioContainer).append(playBtn);
		$(audioContainer).addClass('audio-container');

		resolve(audioContainer);
	});
};

createPlayBtn = () => {
	let playIconContainer = document.createElement('div');
	$(playIconContainer).addClass('text-center cursor-pointer');
	let playIcon = document.createElement('span');
	$(playIcon).addClass('material-icons audio-play-icon');
	$(playIcon).attr('id', 'audio-play-icon');
	$(playIcon).html('play_circle_outline');

	$(playIconContainer).append(playIcon);
	let playBtnTxt = document.createElement('p');
	$(playBtnTxt).html('Play Audio');
	$(playBtnTxt).attr('id', 'audio-play-text');

	let playBtn = document.createElement('div');
	$(playBtn).append(playIconContainer);
	$(playBtn).append(playBtnTxt);

	return playBtn;
};

/* +------------+ */
/* | Play audio | */
/* +------------+ */
playAudio = (elemId) => {
	let audio = document.getElementById(`${elemId}`);
	audio.play();
	$('#audio-play-icon').html('volume_up');
	$('#audio-play-text').html('Audio Playing ...');
	console.log('Playing Audio');
	audio.onended = () => {
		$('#audio-play-icon').html('play_circle_outline');
		$('#audio-play-text').html('Replay Audio');
		console.log('Audio Ended');
	};
};
