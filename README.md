# hyerim-blog

Static GitHub Pages site for school life, project, and study records.

## Fix for GitHub Pages 404

GitHub Pages serves files from the configured branch and folder. For this
repository URL:

```txt
https://hyerim1212.github.io/hyerim-blog/
```

the site must have `index.html` at the repository root when Pages is configured
as `main` branch and `/root` folder.

## GitHub Pages settings

1. Open `Settings` in the GitHub repository.
2. Open `Pages`.
3. Set `Source` to `Deploy from a branch`.
4. Select `main` branch and `/root` folder.
5. Save.

The site may take a few minutes to redeploy after a commit.
