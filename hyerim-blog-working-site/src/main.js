import config from "../site.config.js";

document.title = config.title;

const navigation = document.querySelector("#navigation");
navigation.innerHTML = config.navigation
  .map((item) => `<a href="${item.path}">${item.title}</a>`)
  .join("");

const featured = document.querySelector("#featured");
featured.innerHTML = config.featured
  .map(
    (item) => `
      <article class="card">
        <span class="tag">${item.category}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </article>
    `,
  )
  .join("");

const projectList = document.querySelector("#project-list");
projectList.innerHTML = config.projects
  .map(
    (project) => `
      <article class="card project-card" id="${project.slug}">
        <span class="tag">${project.semester}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <ul class="stack-list">
          ${project.techStack.map((tech) => `<li>${tech}</li>`).join("")}
        </ul>
      </article>
    `,
  )
  .join("");

const studyList = document.querySelector("#study-list");
studyList.innerHTML = config.studyCategories
  .map(
    (category) => `
      <article class="card">
        <span class="tag">${category.category}</span>
        <h3>${category.title}</h3>
        <p>${category.description}</p>
      </article>
    `,
  )
  .join("");

const timeline = document.querySelector("#timeline");
timeline.innerHTML = config.timestamps
  .map(
    (item) => `
      <article class="timeline-item">
        <span>${item.date}</span>
        <div>
          <p class="tag">${item.category}</p>
          <h3>${item.kr}</h3>
          <p>${item.info}</p>
        </div>
      </article>
    `,
  )
  .join("");

document.querySelector("#footer-text").textContent =
  `${config.author.name} · ${config.author.bio.school} · ${config.author.bio.email}`;
