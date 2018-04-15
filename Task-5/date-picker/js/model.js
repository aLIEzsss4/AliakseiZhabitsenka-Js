const Model = {

	currentShift: 0,

	open() {
		const currentDate = new Date;
		this.currentYear = currentDate.getFullYear();
		this.currentMonth = currentDate.getMonth();
		this.getCurrentDay = function(){
			if (this.currentShift !== 0) return null;
			return currentDate.getDate();
		}
	},

	getDate() {
		return new Date(this.currentYear, this.currentMonth + this.currentShift)
	},

	getYear() {
		return this.getDate().getFullYear();
	},

	getMonth() {
		return this.getDate().getMonth();
	},

	getFirstWeekDay() {
		return this.getDate().getDay();
	}

}