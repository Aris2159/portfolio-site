const API = "/.netlify/functions/github";

const params = new URLSearchParams(window.location.search);
const course = params.get("course");

const title = document.getElementById("course-title");
const container = document.getElementById("course-content");

async function loadCourse() {

    if (!course) {
        title.textContent = "No course selected";
        return;
    }

    title.textContent = course;

    try {

        const url = `https://api.github.com/repos/${username}/${repository}/contents/${encodeURIComponent(course)}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not load course");
        }

        const files = await response.json();

        container.innerHTML = "";

        const folders = files
            .filter(file => file.type === "dir")
            .sort((a, b) => a.name.localeCompare(b.name));

        folders.forEach(folder => {

            const button = document.createElement("button");

            button.textContent = "📁 " + folder.name;

            button.onclick = () => loadFolder(folder.name);

            container.appendChild(button);

        });

        if (folders.length === 0) {
            container.textContent = "No folders found.";
        }

    } catch (error) {

        console.error(error);
        container.textContent = "Unable to load course resources.";

    }
}


async function loadFolder(folder) {

    container.innerHTML = "<p>Loading files...</p>";

    try {

        const url = `https://api.github.com/repos/${username}/${repository}/contents/${encodeURIComponent(course)}/${encodeURIComponent(folder)}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not load folder");
        }

        const files = await response.json();

        container.innerHTML = "";

        const backContainer = document.createElement("div");
        backContainer.className = "folder-navigation";
        const backButton = document.createElement("button");
        backButton.textContent = "← Back to folders";
        backButton.onclick = loadCourse;
        backContainer.appendChild(backButton);
        container.appendChild(backContainer);

        const visibleFiles = files.filter(file =>
            file.type === "file" && file.name !== ".gitkeep"
        );

        visibleFiles.forEach(file => {

            const link = document.createElement("a");

            link.textContent = "📄 " + file.name;
            link.href = file.download_url || file.html_url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            container.appendChild(link);

        });

        if (visibleFiles.length === 0) {
            container.appendChild(
                document.createTextNode("No files found.")
            );
        }

    } catch (error) {

        console.error(error);
        container.textContent = "Unable to load files.";

    }
}


document.addEventListener("DOMContentLoaded", loadCourse);
