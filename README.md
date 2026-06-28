# Tack — A Conversational Booking Layer for Thumbtack
### A design engineering concept by Antigravity

Tack is a conceptual AI conversational transaction layer built directly on top of Thumbtack's existing pro marketplace. It bridges the gap between natural language requests from users and Thumbtack's verified database of 300K+ home service professionals. 

No filters. No forms. No back and forth. Just booked.

---

## 1. The Problem: Thumbtack's Filter and Communication Drop-Off

While Thumbtack excels at matching customers with local pros, traditional marketplace funnels suffer from high drop-off rates between matching and booking. Customers are forced to navigate complex filter forms, read through dozens of independent profiles, manually contact 3–5 pros, and coordinate schedules through slow back-and-forth messages. This transaction fatigue represents a major friction point.

---

## 2. The UX Insight: Chat as a Filter Replacement

Instead of browsing directories, customers describe what they need in plain language. Tack serves as a secure conversational booking assistant that parses raw text (e.g. *"my shower has been leaking, need a plumber this Saturday morning under $150"*), checks availability, resolves locations, ranks candidates, answers questions, and coordinates scheduling inside a single conversational flow.

---

## 3. What's Built: Route Map & Screens

* **`/` — Landing Page**:
  Replicates Thumbtack's dark hero design with an integrated search input that instantly initiates the `/chat` route. It features a Tack introduction band, visual horizontal steps cards, and Thumbtack's network trust markers.
* **`/chat` — Conversational Feed**:
  The entire booking journey occurs on this single screen. It manages conversational feed cards, prompt chips, current location requests, and inline zip code overrides.
  * **Gathering Intelligence**: Shows a dark database searching layout with staggering check animations (database search, credentials verify, rating checks, calendar slots, best matches).
  * **Nested Pro Recommendations**: Ranks matching candidate pros. Tapping any card slides open extensive biographies, hire stats, proximity, response times, star reviews, and action controls.
  * **Interactive Question Answering**: Filters and re-ranks pros when the user asks questions (e.g., *"Why is James better than Mike?"*, *"Anyone available Sunday?"*, or *"Under $80 only?"*).
  * **Slide-Up Booking Modal**: Tapping "Book now" opens a bottom sheet review overlay outlining dates, times, pricing totals, and payment details.
* **`/track` — Job Tracker**:
  Follows a confirmed booking. Illustrates live progress timelines (done steps, active step en route with pulsing rings, and pending steps) along with maps ETA strips.

---

## 4. The Design Decision: Conversational Feed vs. Chat Bubbles

Standard chat layouts rely on messenger-style bubbles offset to the left and right. This makes structured content like pro profiles, estimates, and reviews feel like awkward embedded attachments. 

Tack introduces a **Conversational Feed** layout:
* **Editorial Breathing Room**: Full-width cards stacked vertically.
* **Natural Slotting**: Pro recommendation cards fit natively at the exact same width as conversation prompts.
* **Reduced Noise**: User inputs are right-aligned blue-tint pills, while Tack responses act as structural cards that frame content cleanly.

---

## 5. Brand Decision: Native System Extension

Tack does not invent a new brand system; it thoughtfully extends Thumbtack’s signature design tokens:
* **Georgia Serif Headings**: Main display titles and headers use bold Georgia font weights for premium editorial tones.
* **Restrained Accent Palette**: Reserves brand blue (`#009FD4`) specifically for primary CTAs, links, and active controls. All selected cards and overlays use high-contrast dark navy (`#1C2B33`) and neutral slates to reduce visual noise.
* **Micro-Animations**: Uses scale checkmarks, timeline path transitions, and pulsing voice indicators to build interactive delight.

---

## 6. Technology Stack

* **Front End**: React 18 + TypeScript + Vite + Tailwind CSS v3
* **Routing**: React Router v6
* **Icons**: Lucide React (brand-accurate thin outline shapes)
* **Hooks**: Custom state machine `useChat` (`src/hooks/useChat.ts`) handling typing delays, search rows, location confirms, re-ranking filters, and modal transitions.

---

## 7. What a Real Build Needs from Thumbtack

To connect this prototype to production, Thumbtack's tech infrastructure needs:
1. **Public Pro API**: Access to real-time query indexes for ratings, prices, and live calendar availability.
2. **Secure Payments Gateways**: Payment escrow rails (e.g. Stripe Connect) allowing the agent to pre-authorize payments up to the user's spending limit.
3. **MCP Server Integration**: Exposing a Model Context Protocol (MCP) server with tool endpoints (e.g., `search_pros`, `check_availability`, `create_booking`) so LLM agents can query and reserve pros programmatically.

---

## 8. Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open local preview**:
   Navigate to the local URL (usually `http://localhost:5173`) in your browser to test the conversational interface.
