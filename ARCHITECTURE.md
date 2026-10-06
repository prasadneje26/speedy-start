# Portfolio Architecture

## High-level system diagram

```mermaid
flowchart TD
    User[Visitor / Recruiter] --> Browser[Browser]
    Browser --> Router[TanStack Router]
    Router --> Pages[Pages: Home, About, Projects, Coding, Contact]
    Pages --> UI[React Components + Tailwind UI]
    Pages --> Data[Portfolio Data Layer]

    Browser --> API[Server Routes /api]
    API --> Contact[Contact API]
    API --> Chat[Chat API]
    API --> Fetch[External Data Fetchers]

    Fetch --> Github[GitHub API]
    Fetch --> LeetCode[LeetCode fallback endpoints]
    Contact --> Webhook[Optional external webhook]
    Chat --> OpenAI[OpenAI API when configured]

    subgraph AppShell
      Router
      Pages
      UI
      Data
    end

    subgraph Runtime
      API
      Contact
      Chat
      Fetch
    end
```

## Component responsibilities

- Frontend shell
  - TanStack Start handles routing, SSR, and the app shell.
  - React components render the portfolio pages and shared site layout.

- Content source
  - The portfolio data lives in `src/data/portfolio.ts`.
  - It provides profile data, project content, experience and certifications, plus the CV link served from `public/prasad-cv.pdf`.

- Feature pages
  - `src/routes/*` contains content pages such as home, projects, coding, and contact.
  - These pages consume the portfolio data and render recruiter-facing content.

- API layer
  - `src/routes/api/contact.ts` handles contact form submissions.
  - `src/routes/api/chat.ts` handles chat requests with graceful fallback if the environment is not configured.

- Live data services
  - `src/lib/coding.functions.ts` fetches GitHub and LeetCode data, with fallback behavior for providers that block or limit direct requests.

## Current implementation status

### Completed

- Portfolio shell and navigation are in place.
- Branding and favicon polish were applied.
- Profile image flow and layout were corrected.
- GitHub and LeetCode data fetching were fixed with fallback handling.
- Contact form submission flow was implemented and validated.
- Resume download serves the current CV PDF.
- Assistant route degrades gracefully without a configured API key.

### Still optional / not required for the base portfolio

- A real OpenAI key for live AI responses.
- A database-backed CMS for editing content without code changes.
- A full email webhook or CRM integration for contact submissions.
- Deeper analytics and CMS features for lifecycle management.

## Recommendation

The project is already functional as a polished personal portfolio without requiring the OpenAI key. The remaining work is mainly production hardening and optional feature expansion rather than core app functionality.
