# IPC Communication Documentation

## Architecture Overview

The **Woman Calendar** application follows the Electron Security Model, which separates the application into two main processes:

1.  **Renderer Process (UI):** A React-based user interface that runs in a sandboxed environment. It does not have direct access to Node.js APIs or the filesystem.
2.  **Main Process (Backend):** A Node.js process that has full access to system resources. It acts as the "Source of Truth" and handles sensitive operations like encryption and secure storage.

## Communication Protocol (IPC)

Communication between the Renderer and the Main process is handled via **Inter-Process Communication (IPC)**.

### 1. Communication Pattern

The application uses a **Request-Response** pattern implemented via Electron's `ipcRenderer.invoke` and `ipcMain.handle` methods. This allows the Renderer to perform asynchronous operations and wait for the result (as a Promise).

### 2. API Layer

#### Renderer Side (Frontend)
The communication is abstracted through a `contextBridge` in the preload script (`src/preload/preload.ts`). The following API is exposed to the Renderer via `window.electronAPI`:

- `dispatch<T>(request: IpcRequestFor<T>): Promise<IpcResponseFor<T>>`: Sends a request to the Main process and waits for the response.
- `getSystemLocale(): string`: Retrieves the system's current locale.

#### Main Side (Backend)
The Main process listens for specific IPC channels:
- `ipc-dispatch`: The primary channel for all business-logic related requests. It uses a **Chain of Responsibility** pattern to route requests to appropriate handlers.
- `get-system-locale`: Returns the system locale.
- `show-about`: Opens the application's "About" window.

### 3. Data Structures

The types for IPC communication are strictly defined in `src/shared/ipc-types.d.ts` to ensure type safety across both processes.

#### `IpcRequest`
An object containing:
- `type`: A unique identifier for the command (from `IpcRequestMap`).
- `payload`: The data required for the command.

#### `IpcResponse`
An object containing:
- `type`: The original request type.
- `status`: Either `'success'` or `'fail'`.
- `payload`: 
    - If `status === 'success'`: The data returned by the handler (defined in `IpcResponseMap`).
    - If `status === 'fail'`: An object containing a `message` and an optional `error` object.

### 4. Available IPC Commands (Events)

The following commands are available for communication between the Renderer and the Main process. They are defined in `src/shared/ipc-types.d.ts`.

#### App Commands
| Command | Purpose | Request Payload | Response Payload |
| :--- | :--- | :--- | :--- |
| `app:init` | Initializes the application, checks encryption support and security state. | `{ locale: string }` | `{ protected: boolean, encryptionsSupported: boolean }` |

#### Authentication Commands
| Command | Purpose | Request Payload | Response Payload |
| :--- | :--- | :--- | :--- |
| `auth:get-token` | Retrieves the current session token using the provided PIN (or `null` to check status). | `{ pin: string \| null }` | `{ token: string }` |
| `auth:dispose-token` | Disposes of the current session token (logout). | `{ token: string }` | `void` |
| `auth:change-pin` | Updates the user's PIN. | `{ oldPin: string \| null, newPin: string \| null }` | `void` |

#### Data Commands
| Command | Purpose | Request Payload | Response Payload |
| :--- | :--- | :--- | :--- |
| `data:get` | Retrieves the encrypted data content. | `{ token: string }` | `{ content: string }` |
| `data:put` | Saves new content to the secure storage. | `{ token: string, content: string }` | `void` |
| `data:export` | Exports the current data. | `{ token: string, content: string }` | `void` |
| `data:import` | Imports data from a provided content. | `{ token: string }` | `{ content: string }` |
| `data:wipe` | Completely wipes all stored data. | `{ token: string, pin: string \| null }` | `void` |

### 5. Detailed Flow (Example: Data Retrieval)

**Flow of an Event from Frontend to Backend:**

1.  **Frontend Trigger:** A React component calls `window.electronApi.dispatch({ type: 'data:get', payload: { token: '...' } })`.
2.  **Preload Bridge:** The `electronApi.dispatch` function in `src/preload/preload.ts` wraps the request and invokes `ipcRenderer.invoke('ipc-dispatch', request)`.
3.  **Main Process Dispatch:** The `ipcMain.handle('ipc-dispatch', ...)` listener in `src/main/index.ts` catches the request.
4.  **Handler Chain:** The request is passed through a chain of `Handler` objects. A specific handler (e.g., `DataHandler`) identifies the `type` and executes the corresponding business logic.
5.  **Processing:** The handler performs the requested action (e.g., reading encrypted data from disk) and returns a result.
6.  **Response Construction:** The handler returns a result which is wrapped into an `IpcResponse` object with `status: 'success'`.
7.  **Resolution:** The `ipc-dispatch` handler returns the response, and the Promise in the Renderer is resolved with the payload.
