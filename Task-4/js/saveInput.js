function saveInput(selector){
	const inputs = document.querySelectorAll(selector);
	for (let i = 0, n = inputs.length; i < n; i++){
		const input = inputs[i];
		let saveValue;
		let getValue;
		let event;
		switch (inputs[i].type){
			case 'text':
				event = 'input';
				getValue = function(){
					input.value = localStorage[input.name] || '';
				}
				saveValue = function(){
					localStorage[input.name] = input.value;
				}
				break;
			case 'select-one':
				getValue = function(){
					const value = localStorage[input.name];
					const options = input.children;
					for (let i = 0, n = options.length; i < n; i++){
						if (options[i].value === value) options[i].selected = true
					}
				}
				saveValue = function(){
					localStorage[input.name] = input.value;
				}
				break;
			case 'radio':
				getValue = function(){
					input.checked = localStorage[input.name] === input.value ? true : false;
				}
				saveValue = function(){
					localStorage[input.name] = input.checked ? input.value : '';
				}
				break;
			case 'checkbox':
				getValue = function(){
					input.checked = localStorage[input.name] === 'true' ? true : false;
				}
				saveValue = function(){
					localStorage[input.name] = input.checked;
				}
				break;
		}
		if (getValue) getValue();
		if (saveValue) inputs[i].addEventListener(event ? event : 'change', saveValue);
	}
}