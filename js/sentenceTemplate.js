plural = (item) => {

	let irregularPlural = ['bus ', 'bench ', 'wine glass ', 'sandwich ', 'toothbrush '];
	let noPlural = ['scissors ']

	if (item === 'person ') {
		return 'people';
	} else if (irregularPlural.includes(item)){
		return $.trim(item) + 'es';
	} else if (noPlural.includes(item)){
		return item
	} else {
		return item.replace(/\s/g, 's');
	}
};

sentenceTemplate = (detectedObject) => {
	let detectedObjectArr = [];

	for (rawObject in detectedObject) {
		let object = detectedObject[rawObject][0].split(':')[0];
		detectedObjectArr.push(object);
	}

	groupedObject = detectedObjectArr.sort().reduce(
		(item, index) => {
			if (typeof item.last === 'undefined' || item.last !== index) {
				item.last = index;
				item.arr.push([]);
			}
			item.arr[item.arr.length - 1].push(index);
			return item;
		},
		{ arr: [] }
	).arr;

	//console.log(groupedObject);
	let noObject = detectedObjectArr.length == 0;
	let singleObject = detectedObjectArr.length == 1;

	let sentence = '';

	if (noObject) {
		return `Sorry, the app cannot understand the image. Please try with other image`;
	} else if (singleObject) {
		return `There is one ${detectedObjectArr[0]}`;
	} else {
		// Multiple objects, one type
		if (groupedObject[0].length == 1) {
			sentence = `There is ${groupedObject[0].length} ${groupedObject[0][0]}`;

		} else if (groupedObject[0][0] === 'person ') {
			sentence = `There are ${groupedObject[0].length} people`;

		} else {
			sentence = `There are ${groupedObject[0].length} ${plural(String(groupedObject[0][0]))}`;
		}

		let objectCount = groupedObject.length;
		
		// Multiple object with more than one type
		for (i = 1; i < objectCount; i++) {
			let itemCount = groupedObject[i].length;
			let item = '';
			if (groupedObject[i].length == 1 && i < objectCount - 1) {
				item = `${groupedObject[i][0].trim()}`;
			} else if (groupedObject[i].length == 1 && i == objectCount - 1) {
				itemCount = `and ${groupedObject[i].length}`;
				item = `${groupedObject[i][0]}`;
			} else if (groupedObject[i][0] === 'person ' && i < objectCount - 1) {
				item = 'people';
			} else if (groupedObject[i][0] === 'person ' && i == objectCount - 1) {
				itemCount = `and ${groupedObject[i].length}`;
				item = 'people';
			} else if (i == objectCount - 1) {
				itemCount = `and ${groupedObject[i].length}`;
				item = plural(String(groupedObject[i][0]));
			} else {
				item = `${plural(String(groupedObject[i][0]))},`
			}

			sentence = `${sentence}, ${itemCount} ${item}`;
		}

		sentence = sentence.replace(", and", " and")
		
		return sentence+'.';
	}
};
