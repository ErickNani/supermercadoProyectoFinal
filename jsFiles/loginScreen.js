const form = document.getElementById('form-login');

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const userID = document.getElementById('loginName').value;
    const passwordEntered = document.getElementById('password').value;
    supermercado.getCredentials(userID, passwordEntered);
});

supermercado.onValidationSuccess((event, user) => {
    localStorage.setItem('userID', user)
    window.location.href = './pantallaDos.html';
});

supermercado.onValidationError((event, errorMessage) => {
    alert(errorMessage);
});