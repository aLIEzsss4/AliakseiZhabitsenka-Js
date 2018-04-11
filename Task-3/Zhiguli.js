const Zhiguli = function(state = 'medium'){
	let params;
	switch (state){
		case 'old':
			params = {
				weight: 1000,
				maxSpeed: 60,
				acceleration: 1,
				deceleration: 10
			}
			break;
		case 'medium':
			params = {
				weight: 1000,
				maxSpeed: 100,
				acceleration: 1.5,
				deceleration: 20
			}
			break;
		case 'new':
			params = {
				weight: 1000,
				maxSpeed: 150,
				acceleration: 2,
				deceleration: 25
			}
			break;
	}
	Car.call(this, params);
}
Zhiguli.prototype.__proto__ = Car.prototype;