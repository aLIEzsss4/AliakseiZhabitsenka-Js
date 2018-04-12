const Mercedes = function(state){
	state = state || 'new';
	const parameters = {weight: 1200};
	switch (state){
		case 'new':
			parameters.maxSpeed = 230,
			parameters.acceleration = 2.5,
			parameters.deceleration = 30
			break;
		case 'used':
			parameters.maxSpeed = 220,
			parameters.acceleration = 2.25,
			parameters.deceleration = 20
			break;
		case 'old':
			parameters.maxSpeed = 210,
			parameters.acceleration = 2,
			parameters.deceleration = 15
			break;
	}

	Car.call(this, parameters);
}
Mercedes.prototype.__proto__ = Car.prototype;