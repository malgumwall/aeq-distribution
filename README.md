# AEQ Distribution — Landing Page

A fast, single-page marketing site for **AEQ Distribution**, a supplier of brand-name
wholesale and closeout inventory (grocery, beverage, candy, HBA, cleaning, electronics,
toys, and general merchandise). Every call-to-action funnels visitors straight into
**WhatsApp** to start a buying conversation.

Static HTML / CSS / vanilla JS — **no build step, no dependencies**. Deploys free on
GitHub Pages, Netlify, Vercel, or any static host.

---

## 🚀 Go live in 2 edits

Open [`script.js`](./script.js) and edit the `CONFIG` block at the top:

```js
const CONFIG = {
  WHATSAPP_NUMBER: "10000000000",  // ← your full number, digits only (country code + number, no "+")
  WHATSAPP_MESSAGE: "Hi AEQ Distribution, I'm interested in your wholesale inventory.",
  EMAIL: "sales@aeqdistribution.com", // ← optional contact email
};
```

> **WhatsApp number format:** digits only, including country code, **no** `+`, spaces, or dashes.
> Example: `+1 (555) 123-4567` becomes `15551234567`.

That's it — every "Get Inventory", "Request load", the floating button, and the footer link
now open WhatsApp with your number and a pre-filled message.

---

## 🖥️ Preview locally

Just open `index.html` in a browser, or run a tiny static server:

```bash
# Python
python -m http.server 8080
# then visit http://localhost:8080

# or Node
npx serve .
```

---

## 🌐 Deploy

### GitHub Pages
1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch.**
3. Choose `main` / `root` and save. Your site goes live at `https://<user>.github.io/<repo>/`.

### Netlify / Vercel
Drag-and-drop the folder, or connect the repo. No build command needed — it's static.
Set the publish/output directory to the project root.

---

## 🎨 Customizing

| What | Where |
| --- | --- |
| WhatsApp number, message, email | `script.js` → `CONFIG` |
| Colors / fonts / spacing | `styles.css` → `:root` variables at the top |
| Headlines, copy, sections | `index.html` |
| Product categories | `index.html` → `#categories` (`.cat-grid`) |
| Customer segments | `index.html` → `#serve` (`.serve-grid`) |
| FAQ questions | `index.html` → `#faq` (`<details>` blocks) |
| Brand names in the marquee | `index.html` → `.marquee__track` |

### Notes
- Brand names in the scrolling marquee are placeholder text. Swap in the brands you
  actually carry, and only use brand **logos** you have the right to display.
- The "live load" hero card and stats are illustrative — update the numbers to reflect
  real inventory.

---

## 📂 Structure

```
aeq-distribution/
├── index.html   # all page markup
├── styles.css   # all styling (design tokens in :root)
├── script.js    # WhatsApp wiring + nav/menu behavior  ← edit CONFIG here
└── README.md
```

---

© AEQ Distribution. Built as a static landing page.
