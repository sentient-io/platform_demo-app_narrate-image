// 1MB is 1048576
let fileSizeLimit = 1048576 * 5

let dropArea = document.getElementById('single-pic-uploader');
// Prevent default behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
	dropArea.addEventListener(eventName, preventDefaults, false);
});
function preventDefaults(e) {
	e.preventDefault();
	e.stopPropagation();
}

// Highlight effect when drag files over
['dragenter', 'dragover'].forEach((eventName) => {
	dropArea.addEventListener(eventName, highlight, false);
});
['dragleave', 'drop'].forEach((eventName) => {
	dropArea.addEventListener(eventName, unhighlight, false);
});
function highlight(e) {
	dropArea.classList.add('highlight');
}
function unhighlight(e) {
	dropArea.classList.remove('highlight');
}

//Get the data for the files that were dropped
dropArea.addEventListener('drop', handleDrop, false);
function handleDrop(e) {
	let dt = e.dataTransfer;
	let files = dt.files;
	uploadSingplePic(files);
}

// Handle picture preview
uploadSingplePic = (files) => {
  if (files[0].size >= fileSizeLimit){
	$('#pic-size-alert').show()
	$('#single-pic-input').val('') // Clean fields
  } else {
	previewFile(Object.values(files)[0]);
	hideUploader()
  }
}

function hideUploader(){
  $('#single-pic-uploader').hide()
}

// Preview uploaded file
function previewFile(file) {
  $('#uploadedPic').remove()
  $('#narration-result-container').empty()
  $('#control-btns-container').show()
  $('#detect-pic-object-btn').show()
	let reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onloadend = function () {
    let img = document.createElement('img');
    img.setAttribute("id","uploadedPic")
    img.src = reader.result;
		document.getElementById('single-pic-preview').appendChild(img);
	};
}

restart = () => {
	$('#single-pic-input').val('') // Clean fields
	$('#picture-loader').hide()
	$('#narration-result-container').empty()
	$('#narration-result-container').hide()
	$('#uploadedPic').remove()
	$('#single-pic-uploader').show()
	$('detect-pic-object-btn').show()
	$('#control-btns-container').attr('style','display:none !important')
	$('#restart-btn').hide()
	$('#upload-anohter-pic').show()
};