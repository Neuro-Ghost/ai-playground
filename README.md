# Custom AI Agent Controller & Playground

A full-stack, modular Next.js developer playground built to prototype, tweak, and orchestrate automated AI agent personas in real-time. This system interfaces a reactive client dashboard with a secure backend server environment using TypeScript and the official Google Gen AI SDK.

## System Architecture & Framework Stack

- Frontend: Next.js 15 (App Router Architecture) with TypeScript
- Styling UI: Tailwind CSS (Dark Mode Slate Terminal Concept)
- State Engine: Client-Side React hooks (useState) driving asynchronous controlled inputs
- Backend Architecture: Isolated Next.js Server Route Handlers (Node.js Environment)
- AI Core Runtime: Official @google/genai SDK querying the highly optimized gemini-2.5-flash engine

---

## Security & Data Flow Design

To protect infrastructure integrity and maintain strict security compliance, this application employs an isolated server-side execution boundary:

1. Client Capture: The user interacts with the layout controllers, modifying behavioral constraints (System Prompt), creativity variance (Temperature), and messaging arrays (User Prompt).
2. Encrypted Bridge Payload: On action execution, parameters are packaged into a JSON dictionary and pushed across an internal HTTP POST network line (/api/generate).
3. Server Isolation: The backend API endpoint extracts the secure GEMINI_API_KEY entirely from the server's Node runtime. The API key is never exposed to the browser, shielding your account and budget from external scrapers or malicious client inspection.
4. Engine Parsing: The Node environment maps the configuration directly into the Google Gen AI client constructor, fires the command to the cloud servers, accepts the response object, and pipes a sanitized text string back to the browser.

---



---

## Local Installation & Deployment Guide

Follow these steps to clone, configure, and boot the playground infrastructure locally:

1. Clone the Codebase:
   git clone <your-github-repository-url>
   ```cd ai-playground ```

2. Install Engine Dependencies:
   ```npm install```

3. Initialize Local Environment Variables:
   Create a file named .env.local in the root directory and paste your key inside:
   GEMINI_API_KEY=AIzaSyYourActualGoogleAIStudioAPIKeyHere

4. Boot Up the Development Server:
   ```npm run dev```

Once initialized, open your browser to http://localhost:3000 to begin running prompt tests through your local architecture.
