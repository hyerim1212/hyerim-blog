import config from "../site.config.js";
import posts from "../content/posts/index.js";

document.title = config.title;

const byId = (id) => document.querySelector(`#${id}`);

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const renderInline = (text) =>
  escapeHtml(text)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");

const markdownToHtml = (markdown) => {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let paragraph = [];
  let list = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    html.push(`<ul>${list.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`);
    list = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      html.push(`<h3>${renderInline(trimmed.slice(4))}</h3>`);
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      html.push(`<h2>${renderInline(trimmed.slice(3))}</h2>`);
      continue;
    }

    if (trimmed.startsWith("# ")) {
      flushParagraph();
      flushList();
      html.push(`<h1>${renderInline(trimmed.slice(2))}</h1>`);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      list.push(trimmed.slice(2));
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return html.join("");
};

byId("navigation").innerHTML = config.navigation
  .map((item) => `<a href="${item.path}">${item.title}</a>`)
  .join("");

byId("featured").innerHTML = config.featured
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

byId("project-list").innerHTML = config.projects
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

byId("post-list").innerHTML = posts
  .map(
    (post) => `
      <article class="post-card">
        <div>
          <p class="tag">${post.category} · ${post.date}</p>
          <h3><a href="#post=${post.slug}">${post.title}</a></h3>
          <p>${post.summary}</p>
        </div>
        <a class="text-link" href="#post=${post.slug}">읽기</a>
      </article>
    `,
  )
  .join("");

byId("study-list").innerHTML = config.studyCategories
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

byId("timeline").innerHTML = config.timestamps
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

byId("footer-text").textContent =
  `${config.author.name} · ${config.author.bio.school} · ${config.author.bio.email}`;

const renderPostRoute = async () => {
  const match = location.hash.match(/^#post=([\w-]+)$/);
  const postView = byId("post-view");
  const postContent = byId("post-content");

  if (!match) {
    postView.hidden = true;
    return;
  }

  const post = posts.find((item) => item.slug === match[1]);
  if (!post) {
    postContent.innerHTML = "<h1>글을 찾을 수 없습니다.</h1>";
    postView.hidden = false;
    return;
  }

  postView.hidden = false;
  postContent.innerHTML = "<p>글을 불러오는 중입니다.</p>";

  try {
    const response = await fetch(post.file);
    if (!response.ok) throw new Error(`Failed to load ${post.file}`);
    const markdown = await response.text();
    postContent.innerHTML = `
      <p class="tag">${post.category} · ${post.date}</p>
      ${markdownToHtml(markdown)}
    `;
    postView.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch {
    postContent.innerHTML = "<h1>글을 불러오지 못했습니다.</h1><p>파일 경로를 확인해 주세요.</p>";
  }
};

window.addEventListener("hashchange", renderPostRoute);
renderPostRoute();
