var weekDays = ['Mo', 'Th', 'We', 'Tu', 'Fr', 'Sa', 'Su'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'Jyly', 'August', 'September', 'October', 'November', 'December'];

function DatePickerView(mainMethods){
	this.mainMethods = mainMethods;
	this.renderAllElements();
}
DatePickerView.prototype = {
	constructor: DatePickerView,

	openDatePicker: function(){
		this.overlay.classList.add('date-picker-overlay_opened');
	},

	closeDatePicker: function(){
		this.overlay.classList.remove('date-picker-overlay_opened');
	},

	renderMonthYearElement: function(){
		// Create wrapper element
		this.monthYearElement = document.createElement('div');
		this.monthYearElement.className = 'date-picker__month-year';

		// Create elment for month
		this.monthElement = document.createElement('span');
		this.monthElement.className = 'date-picker__month';
		// Create element for year
		this.yearElement = document.createElement('span');
		this.yearElement.className = 'date-picker__year';

		// Create navigation buttons
		this.prevNav = document.createElement('span');
		this.prevNav.className = 'date-picker__left-nav';
		this.prevNav.addEventListener('click', this.mainMethods.onGoToPrevMonth);  // Bind prev navigation on click to go on previous month
		this.nextNav = document.createElement('span');
		this.nextNav.className = 'date-picker__right-nav';
		this.nextNav.addEventListener('click', this.mainMethods.onGoToNextMonth);  // Bind next navigation on click to go on next month

		// Append all elemts in wrapper	
		this.monthYearElement.appendChild(this.monthElement);
		this.monthYearElement.appendChild(this.yearElement);
		this.monthYearElement.appendChild(this.prevNav);
		this.monthYearElement.appendChild(this.nextNav);
	},

	renderWeekDaysElement: function(){
		// Create wrapper element
		this.weekDaysElement = document.createElement('div');
		this.weekDaysElement.className = 'date-picker__days-week';
		// Create days elements and append to wrapper
		for (var i = 0, n = weekDays.length; i < n; i++){
			var day = document.createElement('div');
			day.className = 'date-picker__day-week';
			day.textContent = weekDays[i];
			this.weekDaysElement.appendChild(day);
		}
	},

	renderNumberDaysElement: function(){
		this.numberDaysElement = document.createElement('div');
		this.numberDaysElement.className = 'date-picker__days-num';
	},

	renderNumberDayElement: function(dayIndex, state){
		var numberDayElement = document.createElement('div');
		numberDayElement.className = 'date-picker__day-num';
		// If dayIndex === undefined - create blank day element
		if (dayIndex === undefined){
			numberDayElement.style.opacity = 0;
		} else {
			numberDayElement.textContent = dayIndex;
			if (state.dayNow) numberDayElement.classList.add('date-picker__day-num_day-now');
			if (state.pickedDay) numberDayElement.classList.add('date-picker__day-num_picked');
			numberDayElement.addEventListener('click', this.mainMethods.onPickDate.bind(null, dayIndex));
		}
		this.numberDaysElement.appendChild(numberDayElement);
	},

	renderClearButton: function(state) {
		if (state){
			if (this.clearButton) return;  // Return if already exist
			// Create clear button
			this.clearButton = document.createElement('div');
			this.clearButton.className = 'date-picker__clear-btn';
			this.clearButton.textContent = 'clear';
			this.clearButton.addEventListener('click', this.mainMethods.onClearPickedDate);
			this.wrapper.appendChild(this.clearButton);
		} else {
			// Remove clear button if exist
			if (this.clearButton){
				this.wrapper.removeChild(this.clearButton);
				this.clearButton = undefined;
			}
		}
	},

	setDate: function(dateOptions) {
		// Clear previous date options
		this.numberDaysElement.innerHTML = '';
		// Set new date options
		this.monthElement.textContent = months[dateOptions.month];  // Set month
		this.yearElement.textContent = dateOptions.year;  // Set year
		// Create blank days element and append to wrapepr to start with proper week day
		for (var i = 0; i < dateOptions.firstWeekDay; i++){
			this.renderNumberDayElement();  // Create blank day element
		}
		// Create days element and append to wrapper
		for (var i = 0; i < dateOptions.maxDays; i++){
			var numberDayState = {};
			if (dateOptions.dayNow === i + 1) numberDayState.dayNow = true;
			if (dateOptions.pickedDay === i + 1) numberDayState.pickedDay = true;
			this.renderNumberDayElement(i + 1, numberDayState);  // Create day element
		}
		this.renderClearButton(dateOptions.clearBtn);  // Render clear button
	},

	renderAllElements: function(){
		// Create all necessary elements
		this.renderMonthYearElement();
		this.renderWeekDaysElement();
		this.renderNumberDaysElement();

		// Render all elements to document
		this.overlay = document.createElement('div');
		this.overlay.className = 'date-picker-overlay';
		this.overlay.addEventListener('click', this.mainMethods.onCloseDatePicker);  // Bind overlay on click to close date picker

		this.wrapper = document.createElement('div');
		this.wrapper.className = 'date-picker-wrapper';
		this.wrapper.addEventListener('click', function(e){e.stopPropagation()});  // Dont close date picker on content click
		this.wrapper.appendChild(this.monthYearElement);
		this.wrapper.appendChild(this.weekDaysElement);
		this.wrapper.appendChild(this.numberDaysElement);
		this.overlay.appendChild(this.wrapper);
		document.body.appendChild(this.overlay);
	}
}