### Project Prompts and Requirements

This document consolidates all prompts and requirements that guided this project, across frontend and backend.

---

#### Frontend Prompt (Angular)

Build an Angular frontend with the following requirements:

- General
  - Current Angular version
  - Routing enabled
  - Services for Auth, Rooms, Bookings
  - HTTP interceptor that attaches JWT to requests

- Login
  - Login form with username/password
  - Store JWT in LocalStorage
  - Evaluate roles based on the JWT

- User UI (ROLE_USER)
  - Day view with bookable slots in 15-minute steps (08:00–18:00)
  - Show rooms
  - Query available rooms for a given date
  - Booking form (room + date + start + end)
  - On conflict response from backend: display error message

- Admin UI (ROLE_ADMIN)
  - List all rooms
  - Create, edit, delete room

- Output of the LLM
  - Generate:
    - Angular project structure
    - AuthService, RaumService, BuchungsService
    - Dialogs/forms/components
    - Guards: AuthGuard, AdminGuard

---

#### Backend Defaults

Use two in-memory users as defaults:

- user / password: user with ROLE_USER
- admin / password: admin with ROLE_ADMIN

JWT-based authentication; attach roles in token and use them for authorization.

---

#### Styling Blueprint

Use the provided image as a blueprint for the styling of the booking forms. The global styles in `frontend/src/styles.scss` were adapted accordingly to reflect a clean, modern UI consistent with the blueprint.

Note: The actual image is referenced externally and not stored in the repository.

---

#### Current Issue

1) The user details in the authenticated principal are null.

Resolution approach: Ensure the Spring Security context holds a `UserDetails` principal (not just a username String) when authenticating via JWT, so `@AuthenticationPrincipal UserDetails` injection works in controllers.

2) Consolidate all prompts from this project into a single `prompts.md` file.

Resolution approach: This file is that consolidation.

3) Add logging for errors in frontend and backend for more transparency.

Resolution approach:
- Backend: Added structured logging
  - JwtAuthFilter logs JWT validation failures at WARN.
  - GlobalExceptionHandler logs conflicts/validation/auth failures at WARN and unexpected errors at ERROR with stack trace.
  - application.properties sets logging levels for the project and Spring Security to INFO.
- Frontend: Introduced a global HTTP error logging interceptor that logs method, URL, status and message to console.error while preserving component-level error handling.
