const Bentley = function(state){
	state = state || 'new';
	const parameters = {weight: 1000};
	switch (state){
		case 'new':
			parameters.maxSpeed = 260,
			parameters.acceleration = 3,
			parameters.deceleration = 20
			break;
		case 'used':
			parameters.maxSpeed = 240,
			parameters.acceleration = 2.5,
			parameters.deceleration = 15
			break;
		case 'old':
			parameters.maxSpeed = 260,
			parameters.acceleration = 2,
			parameters.deceleration = 20
			break;
	}

	Car.call(this, parameters);
}
Bentley.prototype.__proto__ = Car.prototype;