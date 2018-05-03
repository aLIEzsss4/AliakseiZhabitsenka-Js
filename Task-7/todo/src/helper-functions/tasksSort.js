export const sortTasks = function(tasks, by){
	switch (by){
		case 'upload':
			tasks.sort((a, b) => {
				return a.uploadDate - b.uploadDate;
			});
			break;

		case 'date':
			tasks.sort((a, b) => {
				return a.date - b.date;
			});
			break;

		case 'title':
			tasks.sort((a, b) => {
				if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
				else if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
				else if (a.title < b.title) return -1;
				else if (a.title > b.title) return 1;
				else return 0;
			});
			break;

		default:
			tasks.sort();
	}
}

export const isTasksSorted = function (tasks){
	if (!tasks.length) return null;

	const sortedBy = [];

	if ( tasks.every((task, i, arr) => {
		if (i === 0) return true;

		const prev = arr[i - 1].title;
		const current = arr[i].title;
		const lowerPrev = prev.toLowerCase();
		const lowerCurrent = current.toLowerCase();

		return lowerPrev === lowerCurrent ? prev <= current : lowerPrev < lowerCurrent;
	}) ) sortedBy.push('title');

	if ( tasks.every((task, i, arr) => {
		if (i === 0) return true;

		const prev = arr[i - 1].date;
		const current = arr[i].date;

		return prev <= current;
	}) ) sortedBy.push('date');

	if ( tasks.every((task, i, arr) => {
		if (i === 0) return true;

		const prev = arr[i - 1].uploadDate;
		const current = arr[i].uploadDate;

		return prev <= current;
	}) ) sortedBy.push('upload');

	return sortedBy.length ? sortedBy : null;
}