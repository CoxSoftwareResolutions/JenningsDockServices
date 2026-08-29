# Jennings Dock Services

The Jennings Dock Services website is a fast, static, single-page site for a family-owned marine construction and dock maintenance business in Henderson, Arkansas. It presents dock construction, boat lift, repair, anchor and cable, and scuba recovery services, with direct phone and email calls to action.

The site is built with [Astro](https://astro.build/), vanilla CSS, and Decap CMS. Homepage content is stored in one JSON file so business owners can update copy, specifications, contact details, and photos without changing the Astro components.

## Features

- Responsive single-page layout with anchored navigation
- Services and boat lift specifications rendered from structured content
- Accessible gallery lightbox with keyboard navigation and Escape-to-close support
- Direct `tel:` and `mailto:` actions throughout the site
- Netlify Forms estimate request form with a honeypot field and thank-you page
- SEO metadata, canonical URL, Open Graph tags, sitemap generation, and local business structured data
- Decap CMS admin interface at `/admin/`

## Requirements

- Node.js `22.12.0` or newer, as specified in `package.json`
- [Bun](https://bun.sh/) is the preferred package manager and command runner
- A Netlify site for deployed CMS authentication, Git Gateway, and form handling

## Local Development

Install dependencies:

```sh
bun install
```

Start the development server:

```sh
bun run dev
```

Open the site at <http://localhost:4321/>. The CMS interface is available at <http://localhost:4321/admin/>.

The local CMS page verifies that Decap loads the configuration and displays the content fields. Login, Git Gateway commits, media uploads, and publishing must be tested on a deployed Netlify site.

## Commands

Run these commands from the project root:

| Command           | Purpose                              |
| :---------------- | :----------------------------------- |
| `bun install`     | Install dependencies                 |
| `bun run dev`     | Start the Astro development server   |
| `bun run build`   | Create a production build in `dist/` |
| `bun run preview` | Serve the production build locally   |
| `bun astro ...`   | Run an Astro CLI command             |

Before deploying, run:

```sh
bun run build
```

The build generates the static homepage, the `/thanks/` form response page, and the sitemap files.

## Content Management

The CMS is configured in [public/admin/config.yml](public/admin/config.yml) and edits [src/data/content.json](src/data/content.json). The site imports that data at build time, so published content becomes visible after Netlify completes a new deployment.

### Deploying the CMS

The current configuration uses Netlify Git Gateway:

```yaml
backend:
  name: git-gateway
  branch: main
```

To test the complete workflow:

1. Deploy the site to Netlify.
2. Enable Netlify Identity for the site.
3. Set registration to **Invite only**.
4. Enable **Git Gateway** under the Identity settings.
5. Invite an editor by email.
6. Open `https://your-site.netlify.app/admin/` and sign in.
7. Edit a low-risk field, save, and publish.
8. Confirm a commit is created on `main` and that Netlify rebuilds the site.
9. Reload the homepage and verify the published change.

Netlify Identity and Git Gateway availability varies by Netlify account and site. If the admin page loads but authentication does not work, check that both features are enabled. The fallback is to use a supported GitHub-based Decap backend and configure its authentication separately.

### Images

Upload site images through the CMS. They are stored in `public/uploads` and served from `/uploads`. The hero image is optional. When no hero image is configured, the homepage uses its built-in color treatment. When the gallery is empty, the page displays a temporary empty-state message.

An Open Graph image should be added at `public/og-image.jpg` before launch. The layout references that path when no other social image is supplied.

## Contact Form

The estimate form is defined in [src/components/ContactCTA.astro](src/components/ContactCTA.astro) with the Netlify form name `estimate-request`. After deployment:

1. Confirm Forms is enabled in Netlify.
2. Submit a test request on the live site.
3. Check **Forms** in the Netlify dashboard for the submission.
4. Configure an email notification for new submissions.

Successful submissions redirect to `/thanks/`.

## Project Structure

```text
/
├── public/
│   ├── admin/
│   │   ├── config.yml       # Decap CMS schema and backend
│   │   └── index.html       # Decap CMS entry point
│   ├── uploads/             # CMS-managed images
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/          # Homepage sections
│   ├── data/
│   │   ├── content.json     # CMS-managed source content
│   │   └── content.ts       # Typed data helpers and contact URLs
│   ├── layouts/
│   │   └── Layout.astro     # SEO metadata and site-wide document shell
│   ├── pages/
│   │   ├── index.astro
│   │   └── thanks.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
└── package.json
```

## Deployment Notes

Astro is configured for static output with the production site URL `https://jenningsdockservices.com`. Update `site` in [astro.config.mjs](astro.config.mjs) if the production domain changes.

The repository should deploy with the following settings:

- **Build command:** `bun run build`
- **Publish directory:** `dist`
- **Node version:** `22.12.0` or newer

The production domain, DNS, Netlify Forms notifications, Identity settings, and Git Gateway permissions are managed in Netlify rather than in this repository.

## Editing Guidelines

- Keep customer-facing copy and specifications in `src/data/content.json`.
- Add gallery images through Decap CMS rather than hard-coding image markup.
- Run `bun run build` after content or component changes.
- Verify phone links, email links, the estimate form, and `/admin/` after deployment.
