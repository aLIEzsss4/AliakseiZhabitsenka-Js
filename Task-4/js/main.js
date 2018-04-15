document.addEventListener('DOMContentLoaded', function(){
	radioCancel('.radio-cancel');
	saveInput('.input-save');

	const form = document.getElementById('form');

	form.addEventListener('submit', function(e){
		e.preventDefault();
		//...Send Form Here
		this.reset();
		localStorage.clear();
		setTimeout(() => alert('Form Sended'), 1000)
	});

	document.addEventListener('keydown', (e) => {
		if (e.keyCode === 116) localStorage.clear();
	});
})