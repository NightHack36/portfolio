var projects = {
  button: {},
};

projects.button.previous = document.querySelector("#previousBtn");
projects.button.next = document.querySelector("#nextBtn");
projects.container = document.querySelector("#project");
projects.videoContainer = document.querySelector(".my-works__computer");
projects.currentProjectIndex = 0;

projects.content = [
  `<div class="project-title">
    <h2 class="highlight format-text">portfolio website</h2>
    </div>
    <div class="project-stack">
    <p>JavaScript</p>
    <p>CSS</p>
    <p>SCSS</p>
    <p>HTML</p>
    </div>
    <div class="project-content format-text">
    <p>The website currently you're on is
      my first Front-end project. It is a
      desktop screen where you'll find 
      applications, settings and
      my info.
      </p>
    </div>
    <div class="project-link">
    <a href="https://github.com/D-Antonelli/portfolio" class="format-text" target="_blank">GitHub Page</a>
    </div>`,

    `<div class="project-title">
    <h2 class="highlight format-text">random quote generator</h2>
    </div>
    <div class="project-stack">
    <p>React</p>
    <p>CSS</p>
    <p>API</p>
    </div>
    <div class="project-content format-text">
    <p>It is a responsive react app fetching data from external APIs to present data for quotes.
      </p>
    </div>
    <div class="project-link">
    <a href="https://github.com/D-Antonelli/portfolio" class="format-text" target="_blank">GitHub Page</a>
    <a href="https://d-antonelli.github.io/random-quote/" class="format-text" target="_blank">Live</a>
    </div>`,

    
    `<div class="project-title">
    <h2 class="highlight format-text">product landing page</h2>
    </div>
    <div class="project-stack">
    <p>HTML</p>
    <p>CSS</p>
    </div>
    <div class="project-content format-text">
    <p>A landing page with a flexible design that fits all device sizes. 
      </p>
    </div>
    <div class="project-link">
    <a href="https://github.com/D-Antonelli/product-landing-page" class="format-text" target="_blank">GitHub Page</a>
    <a href="https://d-antonelli.github.io/product-landing-page/" class="format-text" target="_blank">Live</a>
    </div>`,

  `<div class="project-title">
  <h2 class="highlight format-text">my contact manager</h2>
  </div>
  <div class="project-stack">
  <p>Java</p>
  <p>CSS</p>
  <p>JavaFX</p>
  </div>
  <div class="project-content format-text">
  <p>Easily add, edit, delete, and retrieve contacts with this phonebook-inspired desktop application.
    </p>
  </div>
  <div class="project-link">
  <a href="https://github.com/D-Antonelli/Java-My-Contact-Manager" class="format-text" target="_blank">GitHub Page</a>
  </div>
  </div>`
];

projects.init = (function () {
  projects.content.length < 2 ? (projects.button.next.disabled = true) : "";
  console.log(projects.videoContainer.children[0]);
})();

projects.button.next.addEventListener("click", function () {
  for(var i=0; i < projects.videoContainer.children.length; i++) {
    projects.videoContainer.children[i].style.display = "none";
  }
  projects.currentProjectIndex++;
  projects.button.previous.disabled = false;

  if (projects.content[projects.currentProjectIndex]) {
    projects.container.innerHTML =
      projects.content[projects.currentProjectIndex];
      projects.videoContainer.children[projects.currentProjectIndex].style.display = "block";

    projects.currentProjectIndex++;
    if (!projects.content[projects.currentProjectIndex]) {
      projects.button.next.disabled = true;
      projects.currentProjectIndex--;
    } else {
      projects.button.next.disabled = false;
      projects.currentProjectIndex--;
    }
  } else {
    projects.button.next.disabled = true;
  }
});

projects.button.previous.addEventListener("click", function () {
  for(var i=0; i < projects.videoContainer.children.length; i++) {
    projects.videoContainer.children[i].style.display = "none";
  }
  
  projects.currentProjectIndex--;
  projects.button.next.disabled = false;

  if (projects.content[projects.currentProjectIndex]) {
    projects.container.innerHTML =
      projects.content[projects.currentProjectIndex];
      projects.videoContainer.children[projects.currentProjectIndex].style.display = "block";

    projects.currentProjectIndex--;
    if (!projects.content[projects.currentProjectIndex]) {
      projects.button.previous.disabled = true;
      projects.currentProjectIndex++;
    } else {
      projects.currentProjectIndex++;
    }
  }
});
