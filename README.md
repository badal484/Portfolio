# Developer Portfolio

Next.js App Router portfolio for recruiters and hiring managers. It is intentionally small, fast, and focused on proof: projects, metrics, a case study, and a working contact form.

## Edit Your Details

- Update profile, links, project cards, metrics, and the case study in `lib/portfolio-data.ts`.
- Replace `public/resume.pdf` with your actual resume PDF before deploying.
- Update `app/layout.tsx` metadata after replacing the TODO name.

## Contact Form

The form posts to `app/api/contact/route.ts`.

For real email delivery on Vercel, set:

```bash
RESEND_API_KEY=your_resend_key
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
```

If the Resend variables are missing, the API logs the submission and returns success so local development still works.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy Free To Vercel

```bash
npm install -g vercel
vercel
vercel --prod
```
