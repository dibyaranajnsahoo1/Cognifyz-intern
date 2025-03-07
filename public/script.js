document.querySelector("form").addEventListener("submit", function(event) {
    let username = document.querySelector("[name='username']").value;
    let password = document.querySelector("[name='password']").value;

    if (username.trim() === "" || password.trim() === "") {
        alert("All fields are required!");
        event.preventDefault();
    }
});
