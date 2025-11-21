# Quick Setup Guide

## Step 1: Create Sanity Project

You need to create a Sanity project before you can run the site.

### Option A: Create a new Sanity project

1. Visit [sanity.io/manage](https://www.sanity.io/manage)
2. Click "Create project"
3. Give it a name (e.g., "Wildman Portfolio")
4. Choose a project ID (or let Sanity generate one)
5. Choose "Production" as your dataset name

### Option B: Use the Sanity CLI

```bash
npm create sanity@latest
```

Follow the prompts to create a new project.

## Step 2: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Sanity credentials:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

   You can find these values in your [Sanity dashboard](https://www.sanity.io/manage).

## Step 3: Run the Development Server

```bash
npm run dev
```

## Step 4: Add Content

1. Visit `http://localhost:3000/studio`
2. Sign in with your Sanity account
3. Start adding content:
   - **Site Settings**: Your name, bio, social links
   - **Albums**: Music with Spotify embeds
   - **Film Scores**: Videos of your film work
   - **Video Projects**: Your editing portfolio

## Getting Spotify Embed URLs

1. Open Spotify and find your album/track
2. Click the "..." menu
3. Select "Share" → "Embed track/album"
4. Copy the URL that looks like: `https://open.spotify.com/embed/album/...`
5. Paste this into the "Spotify Embed URL" field in Sanity

## Troubleshooting

### "Project ID not found"
- Make sure your `.env.local` file exists
- Check that the project ID matches your Sanity dashboard
- Restart the dev server after changing `.env.local`

### "Unable to access Studio"
- Make sure you're signed in to Sanity
- Add your local development URL to CORS origins in [Sanity settings](https://www.sanity.io/manage)

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear the `.next` folder and rebuild: `rm -rf .next && npm run dev`
