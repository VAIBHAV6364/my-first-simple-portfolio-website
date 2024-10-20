// Simple login function
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent the form from submitting and reloading the page

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the username and password are correct
    if (username === 'Vaibhav R' && password === '20sc76*VAIBHAV') {
        // If correct, store authenticated status and redirect to Add New Experience page
        sessionStorage.setItem('authenticated', true);
        // Check for the redirect parameter and handle it
const urlParams = new URLSearchParams(window.location.search);
const redirect = urlParams.get('redirect');

if (redirect === 'add-experience.html') {
    window.location.href = 'add-experience.html'; // Redirect to Add Experience page
} else if (redirect === 'delete-experience') {
    const experienceId = urlParams.get('experienceId');
    deleteExperience(experienceId); // Call the delete function after login
} else {
    window.location.href = 'experience.html'; // Default redirect if no action specified
}

//---------------------------------------------------------------- LOGIN FAILED -----------------------------------------
    } else {
        // Display error message if login fails
        document.getElementById('error-message').style.display = 'block';
    }
});

//--------------------------------------------------HANDLING DELETE EXPERIENCE ----------------------------------------------
function deleteExperience(experienceId) {
    var database = firebase.database().ref("experiences");
    database.child(experienceId).remove()
    .then(function() {
        alert('Experience deleted successfully!');
        window.location.href = 'experience.html'; // Redirect back to Experience page
    })
    .catch(function(error) {
        alert('Error deleting experience: ' + error.message);
    });
}

//----------------------------------------------- js for certications page ------------------------------------------------------
// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, push, remove, get } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNsCO8s4SC8_J9nX9f7vwHqoQ21-JopwY",
  authDomain: "portfolio-backend-4af94.firebaseapp.com",
  databaseURL: "https://portfolio-backend-4af94-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portfolio-backend-4af94",
  storageBucket: "portfolio-backend-4af94.appspot.com",
  messagingSenderId: "655914268351",
  appId: "1:655914268351:web:c7ae8447c161bd7ebd780a",
  measurementId: "G-HV6ZHWE5MN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Load certifications from Firebase
document.addEventListener('DOMContentLoaded', () => {
    const certificationRef = ref(database, 'certifications');
    get(certificationRef).then((snapshot) => {
        const certificationGrid = document.getElementById('certification-grid');
        certificationGrid.innerHTML = ''; // Clear the grid first

        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const certification = childSnapshot.val();
                const certificationId = childSnapshot.key; // Get certification ID

                const certificationItem = document.createElement('div');
                certificationItem.classList.add('certification-item');
                certificationItem.innerHTML = `
                    <img src="${certification.thumbnail}" alt="Certificate Image" class="certification-image">
                    <div class="certification-title">${certification.title}</div>
                    <button class="delete-button" onclick="window.location.href='login.html?redirect=delete-certification&certificationId=${certificationId}'">Delete</button>
                `;

                certificationGrid.appendChild(certificationItem);
            });
        } else {
            certificationGrid.innerHTML = '<p>No certifications found.</p>';
        }
    }).catch((error) => {
        console.error('Error fetching certifications:', error);
    });
});
