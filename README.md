# Hugo blog (jeyamohan.in-style layout) + Sveltia CMS

## One-time setup
1. Create a GitHub repo named `<username>.github.io` (or any name) and push this folder to `main`.
2. Edit `hugo.yaml`: `baseURL`, `title`, `tagline`, menus, footer emails, social links.
3. Edit `static/admin/config.yml`: set `repo: <username>/<repo>`.
4. GitHub repo -> Settings -> Pages -> Source: **GitHub Actions**.
5. Every push to `main` builds and publishes the site (about 1 minute).

## Writing posts (no code)
1. Open `https://<your-site>/admin/` and choose **Sign in with token**.
2. Create a GitHub fine-grained personal access token: only this repo, **Contents: Read and write**.
3. **New Post** -> write -> **Publish**. The CMS commits to the repo and the site rebuilds.

Post fields: Title, Date, Categories, Excerpt, Image, **Featured** (top block), **Trending** (ticker).
Category `Featured` feeds the first sidebar slider; the other sliders are set in `hugo.yaml` -> `params.sliders`.

## Local preview
`hugo server -D`  (needs Hugo extended)

## Notes
- Search is client-side (`/search/`, reads `/index.json`), works with Tamil.
- Month archives are one page: `/archive/` (sidebar links jump to each month).
- Menu items pointing at `/categories/<name>/` show 404 until at least one post uses that category.

## Banner image
1. Put your banner in `static/uploads/` (e.g. `banner.jpg`, about 1750 x 255 px). In the CMS you can upload it through any image field's media library.
2. In `hugo.yaml` set `params.banner: "/uploads/banner.jpg"`.
3. Menu bar colours: `params.nav.bg`, `.text`, `.activeBg`.

## Images and YouTube
- Card image on the home page: the post's **Image** field, else the **YouTube thumbnail**, else a coloured letter.
- Paste a YouTube link on its own line in the post body and it becomes a click-to-play video.
  (A link with custom text, like `[watch](https://youtu.be/...)`, stays a normal link, but still provides the thumbnail.)
- Or fill the **YouTube link** field to show the video at the top of the post (don't also paste it in the body).
