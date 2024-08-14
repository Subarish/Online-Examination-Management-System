function createAccount() {
    // Get input values
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    var retypePassword = document.getElementById('retypepassword').value;

    // Basic validation
    if (password !== retypePassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    // Here, you would typically send data to the server to create an account
    // For demonstration purposes, we'll simply redirect to the next page

    // Store user data in local storage (for demo purposes)
    localStorage.setItem('userName', name);
    localStorage.setItem('userPassword', password);

    
    // Redirect to the next page
    window.location.href = 'sys.html';
}
