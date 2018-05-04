function DatePicker(selector) {
	this.setInputs(selector);  // Set all selected date picker inputs
	// Create view with necessary methods
	this.view = new DatePickerView({
		onPickDate: this.handleDayPick.bind(this),
		onClearPickedDate: this.handleClearPickedDate.bind(this),
		onGoToPrevMonth: this.handleGoToPrevNextMonth.bind(this, 'prev'),
		onGoToNextMonth: this.handleGoToPrevNextMonth.bind(this, 'next'),
		onCloseDatePicker: this.handleCloseDatePicker.bind(this)
	});
	// Create model
	this.model = new DatePickerModel();
	// Create event handlers object
	this.events = {};
}
DatePicker.prototype = {
	constructor: DatePicker,

	setInputs: function(selector) {
		this.inputs = document.querySelectorAll(selector);
		Array.prototype.forEach.call(this.inputs, function(input){
			input.setAttribute('readonly', true);  // Make input read only
			input.addEventListener('click', this.handleInputClick.bind(this, input));  // Bind input on click to open date picker
		}, this)
	},

	handleInputClick: function(input) {
		this.openedInput = input;  // Set opened input in property
		this.view.openDatePicker();	// Show date picker
		this.model.setOpenedDate();  // Set opened date
		this.model.setPickedDate(input.dateValue);  // Set picked value from input if exist
		// If picked date exist set display date to picked date, if no set display date to opened date
		if (this.model.pickedDate){
			this.model.setDisplayDate(this.model.pickedDate);
		} else {
			this.model.setDisplayDate(this.model.openedDate);  // Set display date to opened date
		}
		this.renderDisplayDate();
		this.emitEvent('open');
	},

	handleCloseDatePicker: function() {
		this.view.closeDatePicker();	// Hide date picker on close
		this.model.resetDates();	// Reset opened and display dates
		this.openedInput = undefined;
		this.emitEvent('close');
	},

	handleGoToPrevNextMonth(side) {
		var date = this.model.getPrevNextMonth(side);  // Get previous/next month date from model
		this.model.setDisplayDate(date);	// Set display date in model to take it's options
		this.renderDisplayDate();
	},

	handleDayPick: function(day) {
		this.model.setPickedDateByDay(day);
		this.pickDate(this.model.pickedDate);
		this.renderDisplayDate();	// Rerender view to highlight picked date and create clear button
	},

	pickDate: function(date) {
		this.openedInput.dateValue = date.valueOf();	// Set opened input's value to picked date's milliseconds		
		this.emitEvent('pick');
	},

	handleClearPickedDate: function(day) {
		this.model.pickedDate = undefined;
		this.renderDisplayDate();
		this.openedInput.dateValue = undefined;
		this.emitEvent('clear');
	},

	renderDisplayDate: function() {
		var dateOptions = {
			year: this.model.getDisplayYear(),
			month: this.model.getDisplayMonth(),
			firstWeekDay: this.model.getDisplayFirstWeekDay(),
			maxDays: this.model.getMaxDisplayDays(),
			dayNow: this.model.getDisplayDayNow(),
			pickedDay: this.model.getDisplayPickedDay(),
			clearBtn: !!this.model.pickedDate
		}
		this.view.setDate(dateOptions);
	},

	on: function(event, callback) {
		this.events[event] = callback;
	},

	emitEvent: function(event) {
		if (this.events[event]) this.events[event]();
	}
}