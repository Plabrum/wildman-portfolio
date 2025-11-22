# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern portfolio website for creative artists built with Next.js 14 App Router and Sanity CMS. Features sections for music (Wiley Beckett brand with Spotify embeds), film scores, video/editing projects, and a Mammoth section. Uses yellow (#FFD836) as the primary theme color.

## Development Commands

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Sanity Studio

- Access at http://localhost:3000/studio (embedded in Next.js app)
- Configuration: `sanity/config.ts`
- All schemas in `sanity/schemas/`

## Architecture

### Data Flow & Caching Strategy

The site uses **ISR (Incremental Static Regeneration) with on-demand revalidation**:

1. **Development**: `revalidate = 10` seconds for quick iteration (see `app/page.tsx:19`)
2. **Production**: `revalidate = false` (infinite cache) until Sanity webhook triggers revalidation
3. **Webhook endpoint**: `/api/revalidate` - Sanity sends POST requests when content changes
4. **Contact form**: `/api/contact` - Uses Resend to send emails

**Important**: When content doesn't update in production, check:
- Sanity webhook is configured correctly
- `REVALIDATE_SECRET` matches between `.env.local` and Sanity webhook settings
- See `SANITY_WEBHOOK_SETUP.md` for setup instructions

### Content Schemas

Located in `sanity/schemas/`:
- `album.ts` - Music albums with Spotify embeds (Wiley Beckett brand)
- `filmScore.ts` - Film scoring work with video players
- `videoProject.ts` - Video editing projects with categories
- `mammoth.ts` - Single document for Mammoth section
- `siteSettings.ts` - Global site settings (artist name, bio, email, social links)

### Data Fetching Pattern

All data is fetched server-side in `app/page.tsx` using:
1. GROQ queries defined in `sanity/lib/queries.ts`
2. Sanity client configured in `sanity/lib/client.ts`
3. Parallel fetching with `Promise.all()` for optimal performance
4. Results passed to section components as props

### Component Structure

**Page Sections** (`components/sections/`):
- `HeroSection.tsx` - Artist name and bio
- `MusicSection.tsx` - Combines albums (Wiley Beckett) and film scores in one section
- `VideoSection.tsx` - Video editing projects
- `MammothSection.tsx` - Special Mammoth content section
- `ContactForm.tsx` - Contact form (uses Resend API)
- `Footer.tsx` - Email and social links

**Shared Components**:
- `Navigation.tsx` - Sticky nav bar
- `VideoPlayer.tsx` - Universal video player supporting YouTube, Vimeo, etc. (react-player)
- `components/ui/` - shadcn/ui components (button, card)

### Styling

- **Framework**: Tailwind CSS with custom config
- **Primary color**: `#FFD836` (yellow) - defined in `tailwind.config.ts`
- **Font**: Inter (loaded in `app/layout.tsx`)
- **UI components**: shadcn/ui with custom yellow theme
- **Global styles**: `app/globals.css`

### Environment Variables

Required (see `.env.example`):
```
NEXT_PUBLIC_SANITY_PROJECT_ID=     # Sanity project ID
NEXT_PUBLIC_SANITY_DATASET=        # Usually "production"
RESEND_API_KEY=                    # For contact form emails
CONTACT_EMAIL=                     # Where contact form sends to
REVALIDATE_SECRET=                 # Secret for Sanity webhook authentication
```

## Key Implementation Details

### Spotify Embeds
- Users paste any Spotify URL in Sanity Studio
- Album schema accepts any Spotify link format
- The embed URL is used directly in the MusicSection component

### Video Handling
- Supports both external URLs (YouTube, Vimeo) and uploaded files
- `VideoPlayer.tsx` uses react-player for universal video support
- Schema allows choosing between `videoUrl` or `videoFile`

### Image Optimization
- Sanity CDN URLs configured in `next.config.js` for Next.js Image optimization
- Helper functions in `sanity/lib/image.ts` for image URL building

### Content Ordering
- All content types have an `order` field (number)
- Items sorted by `order asc, year desc` in GROQ queries
- Lower order numbers appear first

## Common Tasks

### Adding a New Content Section
1. Create schema in `sanity/schemas/` following existing patterns
2. Add to `sanity/schemas/index.ts` schemaTypes array
3. Create query in `sanity/lib/queries.ts`
4. Add fetch call in `app/page.tsx` getData()
5. Create section component in `components/sections/`
6. Add to main page render in `app/page.tsx`

### Modifying Sanity Schemas
- Schema changes require restarting dev server
- Changes are reflected immediately in Studio UI
- Existing content may need migration for breaking changes

### Working with Webhooks
- Webhook setup documented in `SANITY_WEBHOOK_SETUP.md`
- Test webhooks using Sanity dashboard webhook testing feature
- Check Next.js logs for revalidation confirmation messages
