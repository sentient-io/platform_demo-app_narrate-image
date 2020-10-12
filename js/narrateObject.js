narrateObject = (narratedObject) => {
	// <p> tag will contains the narrated text
	let narrateResult = document.createElement('p');
	narrateResult.innerHTML = narratedObject;
console.log(apikey);
	// Calling text to speech microservice
	$.ajax({
		method: 'POST',
		url:
			'https://apis.sentient.io/microservices/voice/ttseng/v0.1/getpredictions',
		headers: { 'x-api-key': apikey, 'Content-Type': 'application/json' },
		data: JSON.stringify({ text: JSON.stringify(narratedObject) }),
		success: (response) => {
			console.log(response);
			$('#restart-btn').show()
			// Create audio element contains the text to speech result
			let audio = document.createElement('audio');
			audio.innerHTML =
				'<source src="data:audio/wav;base64,' + response.audioContent + ' "/> ';
			Object.assign(audio, {
				control: 'controls',
				autobuffer: 'autobutter',
				autoplay: 'autoplay',
			});
			$('#picture-loader').hide();
			// Display narration result container
			$('#narration-result-container').attr(
				'style',
				'display:block !important;' +
					'width:' +
					parseInt($('#uploadedPic').width() + 20) +
					'px ; height:' +
					parseInt($('#uploadedPic').height() + 20) +
					'px ;'
			);

			$('#narration-result-container').append(audio);
		},
		error: (err) => {
			console.log(err);
			$('#restart-btn').show()
		},
	});

	$('#narration-result-container').append(narrateResult);
}
