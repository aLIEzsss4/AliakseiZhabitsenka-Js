function radioCancel(selector){
	const radioCancelElements = document.querySelectorAll(selector);

	for (let i = 0, n = radioCancelElements.length; i < n; i++){
		radioCancelElements[i].addEventListener('click', cancel);
	}

	function cancel(){
		const input = document.getElementById(this.getAttribute('for'));
		input.checked = false;

		input.dispatchEvent(new CustomEvent('change'));
	}
}