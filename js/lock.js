const togglePassword = document.querySelector('#toggle-password');
	    const passwordInput = document.querySelector('#password');
	    togglePassword.addEventListener('click', function (e) {
		const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
		passwordInput.setAttribute('type', type);
		this.classList.toggle('bxs-lock-alt');
    	this.classList.toggle('bxs-lock-open-alt');
        })