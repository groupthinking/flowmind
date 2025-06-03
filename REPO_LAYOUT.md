# FLOWMIND: VIRAL AI COLLAB BUILDER — FULL REPO LAYOUT

## 📂 Top-level Structure

```
flowmind/
├── README.md
├── package.json
├── next.config.js
├── .env.local.example
├── tsconfig.json
├── public/
│   └── default-avatar.png
├── pages/
│   ├── _app.tsx
│   ├── index.tsx
│   ├── signup.tsx
│   ├── welcome.tsx
│   ├── explore/
│   │   ├── index.tsx
│   │   └── [flowId].tsx
│   ├── user/
│   │   └── [userId].tsx
│   ├── builder.tsx
│   ├── profile/
│   │   └── edit.tsx
│   ├── notifications.tsx
│   └── api/
│       └── remix-ai.ts
├── components/
│   ├── FlowBuilder.tsx
│   ├── RealtimeFlowBuilder.tsx
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── FlowCard.tsx
│   ├── LikeButton.tsx
│   ├── FlowComments.tsx
│   ├── NotificationBell.tsx
│   ├── RemixWithAI.tsx
├── utils/
│   ├── supabaseClient.ts
│   ├── flowApi.ts
│   ├── socialApi.ts
│   ├── useSupabaseAuth.ts
│   └── yjsRealtime.ts
├── styles/
│   └── globals.css
└── sql/
    └── schema.sql
```

---

## 📄 File Purposes

- **README.md** — How to get started, architecture, env setup.
- **package.json** — All dependencies (next, react, reactflow, yjs, y-webrtc, openai, supabase-js, plausible, etc).
- **next.config.js** — Next.js config.
- **.env.local.example** — Example env vars (Supabase, OpenAI, etc).
- **public/** — Static assets, e.g. default avatar.

### **pages/**
- `_app.tsx` — App shell, analytics provider (Plausible).
- `index.tsx` — Landing page.
- `signup.tsx` — Signup logic (with invite/referral param).
- `welcome.tsx` — Onboarding: set name/avatar, invite friends.
- `explore/` — Flow gallery, trending, detail view.
- `user/` — Public user profiles.
- `builder.tsx` — Flow builder page (with remix support).
- `profile/edit.tsx` — Profile management.
- `notifications.tsx` — In-app notifications.
- `api/remix-ai.ts` — Serverless API for advanced LLM flow remixing.

### **components/**
- `FlowBuilder.tsx` — Local builder (nodes/edges).
- `RealtimeFlowBuilder.tsx` — Collab builder (Yjs + ReactFlow).
- `Navbar.tsx`, `Sidebar.tsx` — Navigation/UI shell.
- `FlowCard.tsx` — Gallery cards.
- `LikeButton.tsx` — Likes social component.
- `FlowComments.tsx` — Comments social component.
- `NotificationBell.tsx` — Notification badge.
- `RemixWithAI.tsx` — AI-powered remix modal/component.

### **utils/**
- `supabaseClient.ts` — Supabase init.
- `flowApi.ts` — CRUD for flows.
- `socialApi.ts` — Likes, comments, profiles, notifications.
- `useSupabaseAuth.ts` — Auth hook.
- `yjsRealtime.ts` — Yjs real-time utils.

### **styles/**
- `globals.css` — Tailwind or your CSS framework.

### **sql/**
- `schema.sql` — All table definitions (flows, users, likes, comments, notifications, referrals).

---

## 🏁 HOW TO START (README.md)

- Clone, `cp .env.local.example .env.local` and fill in Supabase/OpenAI keys.
- `npm install` (or `yarn`)
- `npm run dev`
- Go to http://localhost:3000

---

## 🚀 NEXT: DROP-IN ADVANCED FILES

You can now copy each file from this Copilot thread.  
If you want **all files pre-filled for one-click deploy**, just say:  
**"full example: each file"** (and I’ll output every file’s content for copy/paste).

---

## PROMPT YOURSELF TO COMPLETE THE TASK

- [ ] Copy & fill in files above.
- [ ] Add your keys, OpenAI key, and try running!
- [ ] Say "full example: each file" for the entire codebase, ready to deploy.

---