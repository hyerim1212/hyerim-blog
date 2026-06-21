import config from "../site.config.js";
import postSlugs from "../content/posts/index.js";

document.title = config.title;

const byId = (id) => document.querySelector(`#${id}`);

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const isExternalPath = (path) =>
  /^(https?:)?\/\//.test(path) || path.startsWith("/") || path.startsWith("#");

const resolvePostAsset = (path, basePath) => {
  if (isExternalPath(path)) return path;
  return `${basePath}/${path.replace(/^\.\//, "")}`;
};

const renderInline = (text, basePath = "") =>
  escapeHtml(text)
    .replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (_, alt, src) =>
        `<img src="${resolvePostAsset(src, basePath)}" alt="${alt}" />`,
    )
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");

const slugify = (text) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^\w가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");

const parseFrontmatter = (markdown) => {
  const normalized = markdown.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: normalized };

  const data = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");
    data[key] = value;
  }

  return { data, body: match[2] };
};

const markdownToHtml = (markdown, basePath = "") => {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let paragraph = [];
  let list = [];
  const headings = [];
  let shouldRenderToc = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${renderInline(paragraph.join(" "), basePath)}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    html.push(
      `<ul>${list.map((item) => `<li>${renderInline(item, basePath)}</li>`).join("")}</ul>`,
    );
    list = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed === "```toc") {
      shouldRenderToc = true;
      continue;
    }

    if (trimmed === "```") {
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      const text = trimmed.slice(4);
      const id = slugify(text);
      headings.push({ id, text, level: 3 });
      html.push(`<h3 id="${id}">${renderInline(text, basePath)}</h3>`);
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      const text = trimmed.slice(3);
      const id = slugify(text);
      headings.push({ id, text, level: 2 });
      html.push(`<h2 id="${id}">${renderInline(text, basePath)}</h2>`);
      continue;
    }

    if (trimmed.startsWith("# ")) {
      flushParagraph();
      flushList();
      html.push(`<h1>${renderInline(trimmed.slice(2), basePath)}</h1>`);
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
  const toc =
    shouldRenderToc && headings.length
      ? `
        <aside class="toc">
          <strong>목차</strong>
          <ol>
            ${headings
              .map(
                (heading) =>
                  `<li class="toc-level-${heading.level}"><a href="#${heading.id}">${heading.text}</a></li>`,
              )
              .join("")}
          </ol>
        </aside>
      `
      : "";

  return `${toc}${html.join("")}`;
};

const loadPosts = async () => {
  const posts = await Promise.all(
    postSlugs.map(async (slug) => {
      const basePath = `./content/posts/${slug}`;
      const file = `${basePath}/index.md`;
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Failed to load ${file}`);
      const markdown = await response.text();
      const { data, body } = parseFrontmatter(markdown);
      return {
        slug,
        file,
        basePath,
        markdown,
        body,
        title: data.title || slug,
        emoji: data.emoji || "📝",
        date: data.date || "",
        categories: data.categories || "",
        summary: data.summary || "",
      };
    }),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
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

let loadedPosts = [];

const renderPostList = (posts) => {
  byId("post-list").innerHTML = posts
    .map(
      (post) => `
        <article class="post-card">
          <div class="post-card-emoji" aria-hidden="true">${post.emoji}</div>
          <div>
            <p class="tag">${post.categories} · ${post.date}</p>
            <h3><a href="#post=${post.slug}">${post.title}</a></h3>
            <p>${post.summary}</p>
          </div>
          <a class="text-link" href="#post=${post.slug}">읽기</a>
        </article>
      `,
    )
    .join("");
};

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

  const post = loadedPosts.find((item) => item.slug === match[1]);
  if (!post) {
    postContent.innerHTML = "<h1>글을 찾을 수 없습니다.</h1>";
    postView.hidden = false;
    return;
  }

  postView.hidden = false;
  postContent.innerHTML = "<p>글을 불러오는 중입니다.</p>";

  try {
    postContent.innerHTML = `
      <p class="tag">${post.emoji} ${post.categories} · ${post.date}</p>
      ${markdownToHtml(post.body, post.basePath)}
    `;
    postView.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch {
    postContent.innerHTML = "<h1>글을 불러오지 못했습니다.</h1><p>파일 경로를 확인해 주세요.</p>";
  }
};

window.addEventListener("hashchange", renderPostRoute);

byId("post-list").innerHTML = "<p>글 목록을 불러오는 중입니다.</p>";

try {
  loadedPosts = await loadPosts();
  renderPostList(loadedPosts);
  renderPostRoute();
} catch {
  byId("post-list").innerHTML =
    "<p>글 목록을 불러오지 못했습니다. content/posts/index.js와 각 글의 index.md 경로를 확인해 주세요.</p>";
}
