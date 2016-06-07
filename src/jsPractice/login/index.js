window.onload = function() {

	var username = document.getElementById('username');
	var password = document.getElementById('password');
	var button = document.querySelector('.login-btn');
	var errors = document.querySelectorAll('.error');

	button.onclick = function() {
		if (username.value === '') {
			errors[0].style.display = 'inline-block';
		} else {
			errors[0].style.display = 'none';
		}
		if (password.value === '') {
			errors[1].style.display = 'inline-block';
		} else {
			errors[1].style.display = 'none';
		}

		if (username.value !== '' && password.value !== '') {
			// call Ajax 校验
			window.alert('call Ajax request');
		}
	};
};
