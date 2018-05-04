function DatePickerModel() {
}
DatePickerModel.prototype = {
	constructor: DatePickerModel,

	// Method to set date when date picker was opened
	setOpenedDate: function() {
		this.openedDate = new Date();
	},

	// Method to set date for displaying in view
	setDisplayDate: function(date) {
		this.displayDate = date;
	},

	getDisplayYear: function() {
		var displayYear = this.displayDate.getFullYear();
		return displayYear;
	},

	getDisplayMonth: function() {
		var displayMonth = this.displayDate.getMonth();
		return displayMonth;
	},

	getDisplayDayNow: function() {
		var dayNow;
		if (
			this.getDisplayYear() === this.openedDate.getFullYear() &&
			this.getDisplayMonth() === this.openedDate.getMonth()
		) {
			dayNow = this.openedDate.getDate();
		} else {
			dayNow = undefined;
		}
		return dayNow;
	},

	getDisplayFirstWeekDay: function() {
		var firstDisplayWeekDay = new Date(this.getDisplayYear(), this.getDisplayMonth(), 0).getDay();
		return firstDisplayWeekDay;
	},

	getMaxDisplayDays: function() {
		var maxDisplayDays = new Date(this.getDisplayYear(), this.getDisplayMonth(), 0).getDate();
		return maxDisplayDays;
	},

	getDisplayPickedDay: function() {
		if (this.pickedDate === undefined) return undefined;
		var displayPickedDay;
		if (
			this.getDisplayYear() === this.pickedDate.getFullYear() &&
			this.getDisplayMonth() === this.pickedDate.getMonth()
		) {
			displayPickedDay = this.pickedDate.getDate();
		} else {
			displayPickedDay = undefined;
		}
		return displayPickedDay;
	},

	// Method to reset opened date and display date when close date picker
	resetDates: function() {
		this.openedDate = undefined;
		this.displayDate = undefined;
		this.pickedDate = undefined;
	},

	getPrevNextMonth: function(side) {
		var newMonth;
		if (side === 'prev') newMonth = this.getDisplayMonth() - 1;
		else if (side === 'next') newMonth = this.getDisplayMonth() + 1;
		var newDate = new Date(this.getDisplayYear(), newMonth, 1);
		return newDate;
	},

	setPickedDate: function(date) {
		if (date === undefined) return;

		var pickedDate;
		if (typeof date === 'number'){
			pickedDate = new Date(date);
		} else if (Array.isArray(date)){
			pickedDate = Date.apply(pickedDate, date);
		}
		// Set picked date if valid
		if (pickedDate.toString() !== 'Invalid Date'){
			this.pickedDate = pickedDate;
		}
	},

	setPickedDateByDay: function(day) {
		var pickedDate = new Date(this.getDisplayYear(), this.getDisplayMonth(), day);
		this.pickedDate = pickedDate;
	},
}