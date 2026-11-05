const API = "/.netlify/functions/github";

async function loadCourses() {

    const container = document.getElementById("course-buttons");

    try {

        const response = await fetch(
            `https://api.github.com/repos/${username}/${repository}/contents/`
        );

        if (!response.ok) {
            throw new Error("Could not retrieve courses");
        }

        const files = await response.json();

        // Find all folders in the root directory
        const courses = files
            .filter(file => file.type === "dir")
            .sort((a, b) => a.name.localeCompare(b.name));

        // Clear loading message
        container.innerHTML = "";

        if (courses.length === 0) {
            container.textContent = "No courses found yet.";
            return;
        }

        // Generate a button for every course
        courses.forEach(course => {

            const button = document.createElement("button");

            button.textContent = course.name;

            button.onclick = () => {
                window.open(
                    `/coursesArchive/course.html?course=${encodeURIComponent(course.name)}`,
                    "_blank"
                );
            };

            container.appendChild(button);

        });

    } catch (error) {

        console.error(error);

        container.textContent =
            "Unable to load courses. Please try again later.";

    }
}

document.addEventListener("DOMContentLoaded", loadCourses);