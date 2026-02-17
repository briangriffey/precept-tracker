# Phase 1: Project Scaffolding & Foundation

**dispatched_by: mayor**
**phase:** 1 of 10
**blocks:** Phase 2, Phase 3, Phase 4
**dependencies:** None

## Description

Initialize the Electron + React + TypeScript project from scratch. Set up the build pipeline, install core dependencies, and verify the app launches with a basic window. This is the foundation everything else builds on.

## Tasks

### Task 1.1: Initialize Electron Project with React + TypeScript

Create the project using Electron Forge with the Vite + React + TypeScript template. This gives us a modern build pipeline with hot reload for development.

**Commands:**
```bash
npm init electron-app@latest . -- --template=vite-typescript
```

If the directory isn't empty, initialize in a temp directory and move files. Then add React:

```bash
npm install react react-dom
npm install -D @types/react @types/react-dom @vitejs/plugin-react
```

**Files to create/modify:**
- `package.json` - Project manifest with scripts
- `tsconfig.json` - TypeScript configuration
- `vite.main.config.ts` - Vite config for main process
- `vite.renderer.config.ts` - Vite config for renderer (add React plugin)
- `vite.preload.config.ts` - Vite config for preload script
- `forge.config.ts` - Electron Forge configuration

**Acceptance Criteria:**
- [ ] Project initialized with Electron Forge + Vite
- [ ] React and ReactDOM installed with TypeScript types
- [ ] Vite renderer config includes `@vitejs/plugin-react`
- [ ] `npm run start` launches an Electron window
- [ ] `npm run build` completes without errors
- [ ] TypeScript compiles without errors

### Task 1.2: Configure Project Structure

Set up the directory structure that all subsequent phases will build into. Create placeholder files so the structure is clear.

**Directory structure:**
```
src/
  main/
    main.ts              # Electron main process entry
    ipc/                  # IPC handlers (Phase 3)
    database/             # SQLite setup (Phase 3)
  preload/
    preload.ts            # Preload script with contextBridge
  renderer/
    index.html            # HTML entry point
    main.tsx              # React entry point
    App.tsx               # Root React component
    components/           # Shared UI components
    pages/                # Page-level components
    hooks/                # Custom React hooks
    lib/                  # Utilities, constants, types
      design/             # Design tokens (Phase 2)
      data/               # Data access utilities (Phase 3)
      precepts/           # Precept definitions and prompts (Phase 5)
    assets/               # Static assets (fonts, images)
```

**Files to create:**
- `src/main/main.ts` - Main process with BrowserWindow creation
- `src/preload/preload.ts` - Preload script exposing IPC bridge via contextBridge
- `src/renderer/index.html` - HTML shell
- `src/renderer/main.tsx` - React DOM render entry
- `src/renderer/App.tsx` - Root component with "Hello Precept Tracker" placeholder

**Acceptance Criteria:**
- [ ] Directory structure created as specified
- [ ] Main process creates a BrowserWindow (1200x800 default size)
- [ ] Preload script sets up contextBridge with an empty API object
- [ ] Renderer loads React and renders `<App />`
- [ ] App shows "Precept Tracker" text in the window
- [ ] Hot reload works in development (`npm run start`)
- [ ] TypeScript compiles without errors

### Task 1.3: Install Core Dependencies

Install the libraries that will be used across multiple phases. Don't configure them yet - just install and verify no conflicts.

**Production dependencies:**
```bash
npm install better-sqlite3 react-router-dom framer-motion recharts date-fns
```

**Dev dependencies:**
```bash
npm install -D @types/better-sqlite3
```

**Acceptance Criteria:**
- [ ] All packages installed without conflicts
- [ ] `better-sqlite3` native module builds successfully for Electron
- [ ] `npm run build` still completes without errors
- [ ] `npm run start` still launches the app
- [ ] No TypeScript errors from new type packages

### Task 1.4: Configure Electron Forge for Native Modules

Electron needs special configuration to handle native modules like `better-sqlite3`. Configure the build pipeline to handle native module rebuilding.

**Files to modify:**
- `forge.config.ts` - Add native module rebuild configuration
- `package.json` - Add rebuild script if needed

**Configuration needed:**
```typescript
// In forge.config.ts, ensure native modules are rebuilt:
// Add @electron-forge/plugin-native or configure rebuild hooks
```

Also configure:
- App name: "Precept Tracker"
- App icon placeholder (can be updated later)
- Window minimum size: 800x600
- Default window size: 1200x800

**Acceptance Criteria:**
- [ ] `better-sqlite3` loads successfully in the main process at runtime
- [ ] App packages successfully with `npm run package`
- [ ] Packaged app launches and `better-sqlite3` works in the packaged build
- [ ] App metadata (name, window size) configured correctly
- [ ] TypeScript compiles without errors
