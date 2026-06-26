# Tack — An Agent Booking Layer for Thumbtack
### A design engineering concept by Antigravity

Tack is a conceptual AI-agent booking layer built directly on top of Thumbtack's existing pro marketplace. It connects natural language inputs from AI systems (like Anthropic's Claude, OpenAI's ChatGPT, or custom Model Context Protocol agents) with Thumbtack's verified database of 300K+ home service professionals. 

No back-and-forth messages. No ghosting. Just booked.

---

## 1. The Problem: Thumbtack's Drop-Off Gap

While Thumbtack excels at matching customers with qualified local professionals, it suffers from a high transaction drop-off rate between matching and actual booking. Traditional marketplaces require customers to:
* Review multiple pro profiles and read extensive reviews.
* Individually message 3–5 pros to check availability.
* Participate in manual back-and-forth negotiations regarding task details, pricing, and scheduling.
* Suffer delays, unresponsive pros, or drop off entirely due to transaction fatigue.

This represents a multi-billion dollar gap in completed services.

---

## 2. The Solution: Tack as the Agent Layer

Tack bridges this gap by acting as an asynchronous transaction agent. Instead of browsing a marketplace, the customer describes their request once in natural language to their preferred AI assistant. 

Tack acts as the secure booking layer:
1. **Intelligent Query Mapping**: Translates raw conversational requests (e.g. *"shower has been leaking, need someone this Saturday morning before noon"*) into parameterized search queries.
2. **Deterministic Search**: Queries Thumbtack's API for pros matching location, price range, and calendar availability.
3. **AI Recommendation**: Filters and ranks matches, highlighting the single best pro with transparent pricing and live timeslots.
4. **Instant Action**: Authorizes the agent to book, pay, and schedule with one-tap confirmation.

---

## 3. The Paystack Index Parallel (Why Now?)

In the early days of online payments, companies spent weeks integrating bank APIs. Stripe and Paystack succeeded by building a clean developer abstraction layer. 

We are seeing a similar shift from **browser-based user interfaces** to **AI-agent workflows**. However, agents cannot browse visual websites to coordinate tasks; they need structured APIs, licensing verifications, and deterministic booking logic. Tack serves as the transaction layer for the agentic era, enabling LLMs to securely perform real-world actions in the physical service marketplace.

---

## 4. What's Built: Route Map & Screens

This prototype showcases the end-to-end customer journey across 8 dedicated routes:

* **`/` — Landing Page**: Contains the replication of the dark Thumbtack search hero paired with the Tack agent introduction, supporting logos, and visual horizontal steps.
* **`/connect` — Connect Agent**: Onboarding screen to link Claude, ChatGPT, or Custom MCP agents, set optional spend limits, and select approval preferences.
* **`/request` — Describe Request**: Natural language textarea, interactive voice recording simulator with pulse animation, and quick suggestion chips.
* **`/searching` — Gathering Intelligence**: Fullscreen dark transition animation visualizing Thumbtack database search, license verification, star review analysis, calendar checks, and relevance scoring.
* **`/results` — Pro Results**: Clean split ranking view showcasing the "Best match" with a warm-yellow AI reasoning card and secondary pros.
* **`/approve` — Booking Approval**: Detailed line item list, pricing breakdown, transaction totals, and payment confirmation.
* **`/confirmed` — Booking Confirmed**: Celebration state showing generated booking IDs, confirmation summary, and receipts.
* **`/track` — Job Tracker**: Interactive progress timeline illustrating active steps ("En route") with live pulsing rings, ETAs, and support anchors.

---

## 5. The Brand Decision: Native System Extension

Rather than creating a brand-new style system, Tack uses Thumbtack's existing design tokens:
* **Serif Headings**: Georgia/serif for all display h1/h2 headings (e.g. *"For everything home could be."*) to retain Thumbtack's premium editorial tone.
* **Curated Colors**: `#1C2B33` (Hero dark), `#009FD4` (CTA brand blue), and `#F5F7FA` (strictly used for the page background so card components float natively).
* **The AI Reasoning Panel**: A soft `#FFFBEB` yellow signature used exclusively on `/results` and `/approve` to denote moments of AI synthesis.

---

## 6. Technology Stack

* **Front End**: React 18 + TypeScript + Vite + Tailwind CSS v3
* **Routing**: React Router v6
* **Icons**: Lucide React (configured for brand-accurate, thin, unfilled outlines)
* **Data Flow**: Powered by a global React Booking Context (`src/context/BookingContext.tsx`) that flows user data between selections, search, and tracking.
* **Build Configuration**: Verified compilation and clean module syntax verification.

---

## 7. What a Real Build Needs from Thumbtack

To scale this design concept into production, the following infrastructure is required:
1. **Public Pro API**: Access to Thumbtack’s query indexes for real-time ratings, pricing packages, and live calendars.
2. **Secure Payment Gateways**: Escrowed payment APIs (e.g., Stripe Connect) enabling agents to pre-authorize transactions up to the user's spending limit.
3. **MCP Server Integration**: Hosting a Thumbtack Model Context Protocol (MCP) server that exposes endpoints like `search_pros`, `check_availability`, and `create_booking` directly to agents.

---

## 8. Running Locally

Follow these steps to run the interactive prototype:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open local preview**:
   Navigate to the local URL (usually `http://localhost:5173`) in your browser to test the full client-side onboarding and booking simulation.
