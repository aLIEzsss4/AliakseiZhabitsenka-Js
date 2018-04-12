'use strict';

const Car = function(parameters){
	let maxSpeed = 140;
	let acceleration = 1;
	let deceleration = 10;
	let weight = 1000;
	if (parameters){
		if (parameters.maxSpeed) maxSpeed = parameters.maxSpeed;
		if (parameters.acceleration) acceleration = parameters.acceleration;
		if (parameters.deceleration) deceleration = parameters.deceleration;
		if (parameters.weight) weight = parameters.weight;
	}

	this.maxSpeed = maxSpeed;
	this.acceleration = acceleration;
	this.deceleration = deceleration;
	this.weight = weight;
	this.distance = 0;
	this.interval = 10;

	Object.defineProperties(this, {
		'_speed': {
			value: 0,
			writable: true,
		},
		'speed': {
			enumerable: true,
			configurable: true,
			get: function(){
				return this._speed;
			},
			set: function(val){
				if (val < 0){
					val = 0;
				} else if (val > this.maxSpeed){
					val = this.maxSpeed;
				}
				this.countDistance(this._speed, val);
				this._speed = val;
			},
		}
	});

	//...Natural Deceleration
	setInterval(() => {
		this.speed -= 4/this.weight;
	}, this.interval);
}

Car.prototype = {
	constructor: Car,

	accelerate: function(){
		this.stopAcceleration();
		this._accelerationInterval = setInterval(() => {
			this.speed += this.acceleration/40;
		}, this.interval);
	},

	stopAcceleration: function(){
		if (this._accelerationInterval){
			clearInterval(this._accelerationInterval)
		}
	},

	decelerate: function(){
		this.stopDeceleration();
		this._decelerationInterval = setInterval(() => {
			this.speed -= this.deceleration/40;
		}, this.interval);
	},

	stopDeceleration: function(){
		if (this._decelerationInterval){
			clearInterval(this._decelerationInterval)
		}
	},

	countDistance: function(prevSpeed, nextSpeed){
		const speed = (prevSpeed + nextSpeed)/2;
		this.distance += speed*(this.interval/3600000);
	},

	displayDistance: function(distancemeter){
		this.stopDisplaingDistance();
		distancemeter.textContent = this.distance;
		this._displayDistanceInterval = setInterval(() => {
			distancemeter.textContent = this.distance;
		}, this.interval);
	},

	stopDisplaingDistance: function(){
		if (this._displayDistanceInterval) clearInterval(this._displayDistanceInterval);
	},

	displaySpeed: function(speedo){
		this.stopDisplaingSpeed();
		speedo.textContent = this.speed;
		this._displaySpeedInterval = setInterval(() => {
			speedo.textContent = this.speed;
		}, this.interval);
	},

	stopDisplaingSpeed: function(){
		if (this._displaySpeedInterval) clearInterval(this._displaySpeedInterval);
	}
}