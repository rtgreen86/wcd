# AGENTS.md - AI Agent Guidelines for Woman Calendar

This document defines the specialized roles, architectural constraints, and workflows for AI agents working on the **Woman Calendar** codebase.

## 🎯 Project Overview
**Woman Calendar** is a privacy-centric, encrypted desktop application built with **Electron**. Its core value proposition is local-first, secure data storage (using system keychain) and end-to-end encryption for user notes and calendar events.

## 🏗 Architecture & Constraints

The project follows a strict **Electron Security Model**. Agents must adhere to these separation-of-concerns rules:

1.  **Renderer Process (UI):** React-based. **Never** attempt to use Node.js modules (like `fs` or `crypto`) directly in the renderer. All system interactions must go through the Preload layer.
2.  **Preload Script (The Bridge):** The only layer allowed to use `contextBridge`. It must only expose a minimal, hardened API to the Renderer. Never expose entire `ipcRenderer` or `electron` modules.
3.  **Main Process (Backend):** The "Source of Truth". Handles encryption, secure storage (`keytar`), and filesystem operations. Business logic resides in `src/main/services`.
4.  **IPC Communication:** All data exchange between UI and Backend must be asynchronous via `ipcRenderer.invoke` / `ipcMain.handle`.

---

## 🤖 Specialized Agent Personas

### 🎨 Frontend Specialist (UI/UX)
*   **Focus:** `src/renderer`
*   **Tech Stack:** React 19, Redux, TypeScript, CSS Modules, Bootstrap.
*   **Responsibilities:**
    *   Creating responsive and accessible UI components in `src/renderer/components`.
    *   Managing complex UI states using Redux (`src/renderer/state`, `src/renderer/reducers`).
    *   Implementing data fetching via the `src/renderer/api.ts` layer.
*   **Golden Rule:** Do not attempt to implement logic that requires system access. If a UI feature needs a new capability, you must request a new IPC command from the Architect.

### ⚙️ Backend/System Specialist (Main Process)
*   **Focus:** `src/main`
*   **Tech Stack:** Node.js, TypeScript, IPC Handlers, Services.
*   **Responsibilities:**
    *   Implementing secure business logic in `src/main/services`.
    *   Managing lifecycle events in `src/main/index.ts`.
    *   Handling IPC requests in `src/main/handlers`.
*   **Golden Rule:** Always ensure that errors in the Main process are caught and passed back to the Renderer via the IPC channel as meaningful error messages.

### 🛡️ Security & Encryption Specialist
*   **Focus:** `src/main/services/encryption`, `src/main/services/secure-storage`
*   **Tech Stack:** `crypto` (Node.js), `keytar`.
*   **Responsibilities:**
    *   Managing Master Keys and user PIN validation.
    *   Ensuring all data written to disk via `src/main/services/file-system` is encrypted.
    *   Auditing IPC handlers for potential security leaks.
*   **Golden Rule:** Never log sensitive data (PINs, keys, or decrypted content) to the console or logs.

### 🧪 QA & Test Specialist
*   **Focus:** `*.spec.ts`, `*.test.js`
*   **Tech Stack:** Jest, React Testing Library.
*   **Responsibilities:**
    *   Writing unit tests for services in the Main process.
    *   Writing component tests for the Renderer.
    *   Verifying the full IPC flow (Integration testing).
*   **Golden Rule:** Prioritize testing the "Happy Path" and "Failure Modes" (e.g., wrong PIN, file corruption) for all security-related flows.

---

## 🛠 Standard Implementation Workflow

When adding a new feature that involves data (e.g., "User can add a custom tag to an event"), follow this exact flow:

1.  **Define Data Model:** Update `src/main/models` or `src/shared/types`.
2.  **Implement Service:** Add logic in `src/main/services/` to handle the data.
3.  **Create/Update IPC Handler:** Add a new command in `src/main/handlers/` and register it.
4.  **Expose to Bridge:** Update `src/preload/preload.ts` to expose the new function via `contextBridge`.
5.  **Update UI API:** Add the function signature in `src/renderer/api.ts`.
6.  **Build UI:** Implement the React component and Redux action to trigger the new flow.

## ⚠️ Critical Warnings for AI Agents
*   **NO `eval()`:** Never use `eval()` or similar dangerous functions.
*   **NO DIRECT FS:** Never use `import fs from 'fs'` inside `src/renderer`.
*   **TYPING:** Always maintain strict TypeScript types for IPC messages in `src/shared/ipc-types.d.ts`.
