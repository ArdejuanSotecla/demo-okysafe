# Demo Okysafe

Tech stack:

- Next.js (server actions and route handlers)
- Tailwind CSS
- Zod
- React Hot Toast
- Okysafe

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Important files

- `/src/app/verification-callback/route.ts`: This file handles the callback from Okysafe when the user completes the age consent process.
- `/src/components/okysafe-iframe.tsx`: This component renders the Okysafe iframe and handles the communication between the iframe and the parent window.
- `/src/components/age-consent-modal/age-consent-modal-context.tsx`: This context manages the state of the age consent modal.
- `/src/actions/create-identification-token.action.ts`: This action creates an identification token for the user.
