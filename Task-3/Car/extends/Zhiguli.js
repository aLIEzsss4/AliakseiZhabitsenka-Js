const Zhiguli = function(state){
	state = state || 'new';
	const parameters = {weight: 900};
	switch (state){
		case 'new':
			parameters.maxSpeed = 150,
			parameters.acceleration = 2,
			parameters.deceleration = 20
			break;
		case 'used':
			parameters.maxSpeed = 125,
			parameters.acceleration = 1.5,
			parameters.deceleration = 15
			break;
		case 'old':
			parameters.maxSpeed = 100,
			parameters.acceleration = 1,
			parameters.deceleration = 10
			break;
	}

	Car.call(this, parameters);
}
Zhiguli.prototype.__proto__ = Car.prototype;