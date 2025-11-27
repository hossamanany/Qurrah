# Qurrah

Premium eyewear e-commerce platform.

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Hosting:** Netlify (with serverless functions)

## Project Structure

```plaintext
├── apps/
│   └── web/          # Next.js frontend
├── functions/        # Netlify serverless functions
└── netlify.toml      # Netlify configuration
```

## Development

```bash
# Install dependencies
npm install
cd apps/web && npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Deployment

Push to `main` branch to trigger automatic Netlify deployment.
