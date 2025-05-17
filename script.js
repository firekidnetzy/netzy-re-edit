function changeQuote() {
    let quotes = [
        "Life is like a book—some chapters are happy, some are sad.",
        "Yesterday is history, tomorrow is a mystery.",
        "Fearless isn't bravery—it's going through fear.",
        "Some situations are like a chessboard—you must take a step."
    ];
    
    let randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quote").textContent = quotes[randomIndex];
}
function postComment() {
    let commentText = document.getElementById("commentInput").value;
    if (commentText.trim() !== "") {
        let commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        commentDiv.textContent = commentText;

        document.getElementById("comments").appendChild(commentDiv);
        document.getElementById("commentInput").value = ""; // Clear input after posting
    }
// Create Reply Button
        let replyButton = document.createElement("button");
        replyButton.textContent = "Reply";
        replyButton.onclick = function () {
            addReplyField(commentDiv);
        };

        // Create Delete Button
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            commentDiv.remove();
        };

        // Append buttons
        commentDiv.appendChild(replyButton);
        commentDiv.appendChild(deleteButton);
        document.getElementById("comments").appendChild(commentDiv);
        document.getElementById("commentInput").value = ""; // Clear input after posting
    }
}

function addReplyField(commentDiv) {
    let replyInput = document.createElement("textarea");
    replyInput.placeholder = "Type your reply...";
    
    let postReplyButton = document.createElement("button");
    postReplyButton.textContent = "Post Reply";
    postReplyButton.onclick = function () {
        let replyText = replyInput.value;
        if (replyText.trim() !== "") {
            let replyDiv = document.createElement("div");
            replyDiv.classList.add("reply");
            replyDiv.textContent = replyText;
            commentDiv.appendChild(replyDiv);
            replyInput.remove();
            postReplyButton.remove();
        }
    };

    commentDiv.appendChild(replyInput);
    commentDiv.appendChild(postReplyButton);
}
}
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page refresh

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let userData = { username, email, password };
    
    localStorage.setItem("user", JSON.stringify(userData)); // Save data locally
    
    alert("Account created successfully!");
});
document.addEventListener("DOMContentLoaded", function () {
    let userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
        document.getElementById("username").textContent = userData.username;
        document.getElementById("email").textContent = userData.email;
    } else {
        window.location.href = "login.html"; // Redirect if not logged in
    }
});

function logout() {
    localStorage.removeItem("user"); // Remove user data
    window.location.href = "login.html"; // Redirect to login page
}
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.email === email && savedUser.password === password) {
        alert("Login successful!");
        window.location.href = "account.html"; // Redirect to account page
    } else {
        alert("Invalid email or password!");
    }
});
function uploadProfilePic() {
    let fileInput = document.getElementById("uploadPic");
    let profilePic = document.getElementById("profilePic");

    if (fileInput.files.length > 0) {
        let reader = new FileReader();
        reader.onload = function (e) {
            profilePic.src = e.target.result;
            localStorage.setItem("profilePic", e.target.result); // Save image
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

// Load saved profile picture when the page loads
document.addEventListener("DOMContentLoaded", function () {
    let savedPic = localStorage.getItem("profilePic");
    if (savedPic) {
        document.getElementById("profilePic").src = savedPic;
    }
});
function signUp() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (username && email && password) {
        let userData = { username, email, password };
        localStorage.setItem("user", JSON.stringify(userData)); // Save user info
        alert("Account created successfully!");
    } else {
        alert("Please fill all fields!");
    }
}

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.email === email && savedUser.password === password) {
        alert("Login successful!");
        document.querySelector(".auth-section").style.display = "none";
        document.getElementById("accountPage").style.display = "block";
        document.getElementById("displayUsername").textContent = savedUser.username;
        document.getElementById("displayEmail").textContent = savedUser.email;
    } else {
        alert("Invalid email or password!");
    }
}

function logout() {
    document.getElementById("accountPage").style.display = "none";
    document.querySelector(".auth-section").style.display = "block";
    alert("Logged out successfully!");
}

