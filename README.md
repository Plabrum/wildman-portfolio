# Wildman Portfolio

A modern portfolio website for creative artists built with Next.js 14, Sanity CMS, and shadcn/ui. Features sections for music (with Spotify embeds), film scores, and video/editing projects.

## Features

- 🎵 **Music Section**: Display albums with artwork and embedded Spotify players
- 🎬 **Film Scores**: Showcase film scoring work with video players
- 🎥 **Video/Editing**: Present video editing projects with multi-platform support
- 📱 **Responsive Design**: Mobile-first design with yellow (#FFD836) theme
- 🎨 **Sanity CMS**: Full-featured content management with Sanity Studio
- ⚡ **Next.js 14**: App Router, Server Components, optimized performance

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **CMS**: Sanity.io v3
- **Styling**: Tailwind CSS + shadcn/ui
- **Video Player**: React Player (YouTube, Vimeo, etc.)
- **Language**: TypeScript

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity

1. Create a Sanity account at [sanity.io](https://www.sanity.io/)
2. Create a new project:
   ```bash
   npm create sanity@latest -- --project-id <your-project-id> --dataset production
   ```
   Or use an existing project from your Sanity dashboard

3. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

4. Update `.env.local` with your Sanity credentials:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### 4. Access Sanity Studio

Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) to access the Sanity Studio and start adding content.

## Content Management

### Adding Content in Sanity Studio

1. **Site Settings**: Configure your artist name, bio, and social links
2. **Albums**: Add music albums with artwork and Spotify embed URLs
3. **Film Scores**: Add film scoring projects with video URLs
4. **Video Projects**: Add video editing work with categories

### Getting Spotify Embed URLs

1. Open a Spotify album/track
2. Click "..." → "Share" → "Embed"
3. Copy the embed URL (e.g., `https://open.spotify.com/embed/album/...`)

### Supported Video Platforms

- YouTube
- Vimeo
- Any platform supported by react-player

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main portfolio page
│   ├── globals.css         # Global styles
│   └── studio/             # Sanity Studio route
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── sections/           # Page sections
│   ├── Navigation.tsx      # Navigation bar
│   └── VideoPlayer.tsx     # Universal video player
├── sanity/
│   ├── config.ts           # Sanity configuration
│   ├── schemas/            # Content schemas
│   └── lib/                # Sanity client & queries
└── lib/
    └── utils.ts            # Utility functions
```

## Customization

### Theme Colors

The yellow theme is defined in `tailwind.config.ts`:
- Primary: `#FFD836`
- Primary Light: `#FFE55C`

### Typography

Using Inter font from Google Fonts. Change in `app/layout.tsx`.

### Section Order

Modify the section order in `app/page.tsx`.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
4. Deploy!

### Deploy Sanity Studio

The Studio is included at `/studio` and will deploy with your Next.js app. No separate deployment needed!

## License

MIT