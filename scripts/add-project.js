// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

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

// Handle form submission
document.getElementById('add-project-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Get form values
    const title = document.getElementById('project-title').value;
    const description = document.getElementById('project-description').value;
    const detailedDescription = document.getElementById('project-detail-description').value;
    const domain = document.getElementById('project-domain').value;
    const technologies = document.getElementById('project-tech').value;
    const githubLink = document.getElementById('project-link').value;
    const images = document.getElementById('project-images').value.split(',');  // Convert image URLs to an array

    // Create project object
    const newProject = {
        title: title,
        description: description,
        detailedDescription: detailedDescription,
        domain: domain,
        technologies: technologies,
        githubLink: githubLink,
        images: images
    };

    // Save project to Firebase under the "projects" node
    const projectsRef = ref(database, 'projects');
    push(projectsRef, newProject)
        .then(() => {
            alert('Project added successfully!');
            window.location.href = 'projects.html'; // Redirect back to Projects page
        })
        .catch((error) => {
            alert('Error adding project: ' + error.message);
        });
});
