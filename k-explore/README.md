# K Explore

A responsive event management web app for discovering events, reading full details with a live countdown, and registering with validated forms. Built with React, Vite and Tailwind CSS.

## Project overview

K Explore lets a visitor browse upcoming tech, music, sports and workshop events, search them live, open a details view with speakers, location and ticket status, and reserve a spot. Registrations are validated on the client and saved to `localStorage`, so the app works without a backend.

## Features

- **Hero and navigation:** sticky header with logo, Home, Events and Register links, a mobile menu, and a dark/light theme toggle. The hero previews the next event with a live countdown.
- **Event discovery:** responsive grid of ticket-style cards showing banner, title, date and time, venue, category badge, short description, price, and availability.
- **Live search:** filters by title and description as you type.
- **Category filters:** All, Tech, Music, Sports and Workshops, with `aria-pressed` state.
- **Event details modal:** full description, speakers, organizer, a location map placeholder, price, seats left, and a countdown (days, hours, minutes, seconds). Closes with Escape, the close button, or a backdrop click.
- **Registration form:** full name, email, phone and event selector. Required-field checks, regex validation for email and phone, real-time errors after a field is touched, and duplicate-email protection per event.
- **Persistence:** registrations are stored under the `kexplore-registrations` key in `localStorage`.
- **Confirmation:** a dialog confirms each successful registration.
- **Theme:** dark and light modes follow the operating system on first visit, can be toggled, and are remembered. The saved theme is applied before first paint, so there is no flash.
- **Accessibility:** semantic landmarks, labelled form fields, error messages linked with `aria-describedby`, visible focus rings, keyboard-operable dialogs, and reduced-motion support.

## Design direction

The interface takes its cue from event tickets. Cards use a perforated stub line, so the date, price and status sit on the "stub" below the tear line. Headlines use Fraunces, a soft serif with optical sizing, paired with Instrument Sans for body text. The palette is a warm paper background with deep teal as the action colour and marigold reserved for "selling fast" signals. Dark mode swaps to a deep ink-teal base so the teal remains legible.

## Tech stack

- React 18
- Vite 5
- Tailwind CSS 3 (with CSS-variable design tokens for theming)
- Lucide React (icons)
- Google Fonts: Fraunces and Instrument Sans
- Plain JavaScript and `localStorage`. No backend or database.

## Project structure

```
k-explore/
├── index.html                  # Entry HTML, font loading, no-flash theme script
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx                # React root, providers
    ├── App.jsx                 # Layout, search and filter state, modal state
    ├── index.css               # Tailwind layers, theme tokens, shared button styles
    ├── context/
    │   └── ThemeContext.jsx    # Dark/light state, persistence, toggle hook
    ├── data/
    │   └── events.js           # Event data plus status, price and date helpers
    ├── utils/
    │   ├── validation.js       # Field validators and form-level validation
    │   └── storage.js          # localStorage read/write for registrations
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── EventFilters.jsx    # Search input and category pills
        ├── EventCard.jsx
        ├── EventModal.jsx      # Full details view
        ├── Countdown.jsx       # Live countdown timer
        └── RegistrationForm.jsx# Form, validation, success dialog
```

## Setup instructions

**Requirements:** Node.js 18 or newer and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (http://localhost:5173)
npm run dev

# 3. Create a production build in dist/
npm run build

# 4. Preview the production build locally
npm run preview
```

### Customising events

Edit `src/data/events.js`. Each event needs:

| Field | Purpose |
| --- | --- |
| `id` | Unique string used for registration |
| `title`, `category` | Shown on cards; category must match a value in `CATEGORIES` |
| `date` | ISO 8601 string, for example `2027-01-15T18:00:00+05:30` |
| `venue`, `organizer` | Location and host |
| `price` | Number in rupees. `0` displays as "Free" |
| `capacity`, `seatsLeft` | `seatsLeft` of `0` marks the event sold out. 15 or fewer shows "Selling fast" |
| `banner` | Image URL. The demo uses placeholder images from picsum.photos |
| `shortDescription`, `description` | Card text and modal text |
| `speakers` | Array of `{ name, role }` |

Add a category by appending it to `CATEGORIES` and using the same string in events.

### Viewing stored registrations

Open the browser developer tools, go to Application (or Storage) > Local Storage, and inspect `kexplore-registrations`. Each entry includes `id`, `name`, `email`, `phone`, `eventId`, `eventTitle` and `createdAt`.

## Deployment guide

The app is a static site, so any static host works. Run `npm run build` to confirm the build succeeds, then deploy the `dist/` folder or connect the repository to a host.

### Push to GitHub first

```bash
git init
git add .
git commit -m "Initial commit: K Explore"
git branch -M main
git remote add origin https://github.com/<your-username>/k-explore.git
git push -u origin main
```

### Vercel

1. Go to vercel.com, choose **Add New > Project**, and import the repository.
2. Vercel detects Vite automatically. Confirm these settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
3. Click **Deploy**. Every push to `main` redeploys automatically.

### Netlify

1. Go to app.netlify.com, choose **Add new site > Import an existing project**, and connect the repository.
2. Set these build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Click **Deploy site**.

Single-page routing is not needed because the app has one page with anchor navigation.

### GitHub Pages

1. In `vite.config.js`, set `base` to your repository name so asset paths resolve:

   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/k-explore/',
   });
   ```

2. Install the publishing helper:

   ```bash
   npm install --save-dev gh-pages
   ```

3. Add these scripts to `package.json`:

   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

4. Run `npm run deploy`. In the repository settings, go to **Pages** and set the source to the `gh-pages` branch.

The site will be available at `https://<your-username>.github.io/k-explore/`.

## Browser support

Current versions of Chrome, Edge, Firefox and Safari, on desktop and mobile.

## Notes and next steps

- Registrations live in one browser. To share them, connect a backend (for example, Supabase or Firebase) and replace the functions in `src/utils/storage.js`.
- Replace the map placeholder in `EventModal.jsx` with a Google Maps or Mapbox embed.
- Add a routing library such as React Router if you want separate URLs for each event.

## License

MIT. Replace this section with your preferred license.
