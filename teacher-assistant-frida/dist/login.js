var attempt = 3; // Variable to count number of attempts.
function validate() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (email == "disha.bahal@gmail.com" && password == "disha12") {
        alert("Login successful!");
        // window.location = "home.html"; // Redirecting to other page.
        window.open('home.html');
        return false;
    } else {
        alert("Login failed");
        attempt--; // Decrementing by one.
        alert("You have left " + attempt + " attempt;");
        // Disabling fields after 3 attempts.
        if (attempt == 0) {
            document.getElementById("email").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }

    }
}