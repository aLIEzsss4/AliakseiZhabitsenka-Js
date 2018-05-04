const DatePicker = function(selector){
	View.render({
		prev: this.goPrev.bind(this),
		next: this.goNext.bind(this)
	});

	this.inputs = document.querySelectorAll(selector);
	for (let i = 0, n = this.inputs.length; i < n; i++){
		const input = this.inputs[i];
		input.readOnly = true;
		input.addEventListener('click', () => {
			this.currentInput = input;
			this.start();
		})
	}
}
DatePicker.prototype = {
	constructor: DatePicker,

	goPrev() {
		Model.currentShift -= 1;
		this.openView();
	},

	goNext() {
		Model.currentShift += 1;
		this.openView();
	},

	setDate(day) {
		const year = Model.getYear();
		const month = Model.getMonth() + 1 < 10 ? '0' + (Model.getMonth() + 1) : Model.getMonth() + 1;
		day = day < 10 ? '0' + day : day;
		this.currentInput.value = `${year}.${month}.${day}`;

		this.chosenDate = new Date(year, Model.getMonth(), day);
		this.currentInput.dateValue = this.chosenDate;
	},

	openView() {
		const year = Model.getYear();
		const month = Model.getMonth();
		const firstWeekDay = Model.getFirstWeekDay();
		const currentDay = Model.getCurrentDay();
		const totalDays = Model.getTotalDays();
		View.open({
			year: year,
			month: month,
			firstWeekDay: firstWeekDay,
			currentDay: currentDay,
			totalDays: totalDays
		});
	},

	start() {
		Model.open();
		this.openView();
	}
}