const View = {

	weekDays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],

	months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

	renderMonthYear(nav) {
		this.monthYearElem = document.createElement('div');
		this.monthYearElem.className = 'date-picker__month-year';
		
		this.monthElem = document.createElement('span');
		this.monthElem.className = 'date-picker__month';

		this.yearElem = document.createElement('span');
		this.yearElem.className = 'date-picker__year';

		this.leftNav = document.createElement('span');
		this.leftNav.className = 'date-picker__left-nav';
		this.leftNav.addEventListener('click', nav.prev);
		this.rightNav = document.createElement('span');
		this.rightNav.className = 'date-picker__right-nav';
		this.rightNav.addEventListener('click', nav.next);

		this.monthYearElem.appendChild(this.monthElem);
		this.monthYearElem.appendChild(this.yearElem);
		this.monthYearElem.appendChild(this.leftNav);
		this.monthYearElem.appendChild(this.rightNav);
	},

	renderDaysWeek() {
		this.daysWeekElem = document.createElement('div');
		this.daysWeekElem.className = 'date-picker__days-week';
		this.dayWeekElems = [];

		for (let i = 0, n = this.weekDays.length; i < n; i++){
			const day = this.weekDays[i];
			this.dayWeekElems[i] = document.createElement('span');
			this.dayWeekElems[i].className = 'date-picker__day-week';
			this.daysWeekElem.appendChild(this.dayWeekElems[i]);
		}
	},

	renderDaysNum() {
		this.daysNumElem = document.createElement('div');
		this.daysNumElem.className = 'date-picker__days-num';
	},

	render(nav) {
		this.wrapper = document.createElement('div');
		this.wrapper.className = 'date-picker-wrapper';
		this.wrapper.addEventListener('click', this.close.bind(this));

		this.content = document.createElement('div');
		this.content.className = 'date-picker';
		this.content.addEventListener('click', (e) => e.stopPropagation());

		this.renderMonthYear(nav);
		this.renderDaysWeek();
		this.renderDaysNum();
		this.content.appendChild(this.monthYearElem);
		this.content.appendChild(this.daysWeekElem);
		this.content.appendChild(this.daysNumElem);

		this.wrapper.appendChild(this.content);

		document.body.appendChild(this.wrapper);
	},

	open(date) {
		this.wrapper.classList.add('date-picker-wrapper_opened');

		this.monthElem.textContent = this.months[date.month] + ' ';
		this.yearElem.textContent = date.year;

		let weekDay = date.firstWeekDay;
		this.dayWeekElems.forEach((val, i) => {
			if (weekDay === this.weekDays.length) weekDay = 0;
			val.textContent = this.weekDays[weekDay];
			weekDay++;
		});

		this.daysNumElem.innerHTML = '';
		for (let i = 0; i < date.totalDays; i++){
			const dayNumElem = document.createElement('span');
			dayNumElem.className = 'date-picker__day-num';
			if (date.currentDay - 1 === i){
				dayNumElem.className = 'date-picker__day-num date-picker__day-num_current'
			};
			dayNumElem.textContent = i + 1;
			this.daysNumElem.appendChild(dayNumElem);

			dayNumElem.addEventListener('click', () => {
				date.setDate(i + 1);
			});
		}
	},

	close() {
		this.wrapper.classList.remove('date-picker-wrapper_opened');
	}

}