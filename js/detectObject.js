const contentType = 'application/json';
console.log(apikey);
detectPicObject = () =>{
	$('#loading-text').html('Detecting Objects ... ')
	$('#picture-loader').attr(
		'style',
		'display:block !important;' +
			'width:' +
			parseInt(($('#uploadedPic').width())+20) +
			'px ; height:' +
			parseInt(($('#uploadedPic').height())+20) +
			'px ;')
	$('#picture-loader').show()
	$('#detect-pic-object-btn').hide()
	$('#upload-anohter-pic').hide()
	// Calling object detection API
	detectObject($('#uploadedPic').attr('src').split('base64,')[1])
}

detectObject = (base64string) => {
	$.ajax({
		method: 'POST',
		url:'https://apis.sentient.io/microservices/cv/objectdetection/v0.1/getpredictions',
		headers: { 'x-api-key': apikey, 'Content-Type': 'application/json' },
		data: JSON.stringify({"image_base64" : base64string}),
		success: (response) => {
			let sentence = sentenceTemplate(response)
			//console.log(sentence)
			$('#loading-text').html('Object detected. Processing voice ... ')
            narrateObject(sentence)
        },
		error: (err) => {
			let sentence = "Sorry, the app cannot understand the image. Please try with other image"
			$('#loading-text').html('Sorry, the app cannot understand the image. Please try with other image, processing voice ... ')
			narrateObject(sentence)
            //console.log(sentence);
        },
	});
}
