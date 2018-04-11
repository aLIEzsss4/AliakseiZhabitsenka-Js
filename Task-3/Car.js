'use strict';

const Car = function({weight = 1000, maxSpeed = 150, acceleration = 1, deceleration = 10}){
	this.weight = weight;
	this.maxSpeed = maxSpeed;
	this.acceleration = acceleration;
	this.deceleration = deceleration;
	this.speed = 0;
	this.distance = 0;
}
Car.prototype = {
	constructor: Car,

	start: function(){
		this.accelerateTo(this.maxSpeed);
	},

	accelerateTo: function(speed){
		if (speed === this.speed) return;
		let {speedChange, stopCondition} = speed > this.speed ?
			{
				speedChange: this.acceleration,
				stopCondition: () => this.speed >= speed || this.speed >= this.maxSpeed
			} : {
				speedChange:-this.deceleration,
				stopCondition: () => this.speed <= speed || this.speed <= 0
			}
		const speedChangeInterval = setInterval(() => {
			this.speed += speedChange;
			if (stopCondition()) clearInterval(speedChangeInterval);
		}, 1000)
	},

	stopShowingSpeed: function(){},

	showSpeed: function(){
		if (this.stopShowingSpeed) this.stopShowingSpeed();
		console.log(this.speed);
		const showSpeedInterval = setInterval(() => console.log(this.speed), 1000);
		this.showingSpeed = true;
		this.stopShowingSpeed = () => {
			clearInterval(showSpeedInterval);
			this.showingSpeed = false;
		}
	}
}