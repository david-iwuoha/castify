<div align="center">

```
 ██████╗ █████╗ ███████╗████████╗██╗███████╗██╗   ██╗
██╔════╝██╔══██╗██╔════╝╚══██╔══╝██║██╔════╝╚██╗ ██╔╝
██║     ███████║███████╗   ██║   ██║█████╗   ╚████╔╝ 
██║     ██╔══██║╚════██║   ██║   ██║██╔══╝    ╚██╔╝  
╚██████╗██║  ██║███████║   ██║   ██║██║        ██║   
 ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝╚═╝        ╚═╝  
```

### **Corporate Training, Reimagined.**
*Transform any compliance or onboarding document into Netflix-style interactive video episodes — starring your own employees.*

<br/>

[![Built With](https://img.shields.io/badge/Built%20With-Claude%20AI-6C3BF5?style=for-the-badge&logo=anthropic&logoColor=white)](https://anthropic.com)
[![Voice](https://img.shields.io/badge/Voice-YarnGPT-FF6B35?style=for-the-badge)](https://yarngpt.co)
[![Avatar](https://img.shields.io/badge/Avatar-D--ID-00B4D8?style=for-the-badge)](https://d-id.com)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Hackathon%20Demo-F59E0B?style=for-the-badge)]()

<br/>

> 🏆 **Built for the Claude AI Hackathon 2025**

</div>

---

## 📖 The Problem

It's Monday morning at a Lagos fintech. The compliance officer has just received a memo — the regulator requires all 200 staff to complete their annual training by end of month.

She sighs. Opens her laptop. Attaches a 47-page PDF to a company-wide email and types:

> *"Please read and sign the acknowledgement form by Friday."*

By Friday, 180 people have signed. **Three actually read it.**

Six weeks later, a junior staff member makes a textbook error that the manual explicitly warned against. The company gets flagged. The fine lands.

**This is not a Nigerian problem. This is a global problem.**

---

## 💡 The Solution

**Castify** turns that same 47-page document into a 3-episode Netflix-style training series — in minutes — hosted by the company's own employees, in their own voice and likeness.

```
📄 Upload Document  →  🧠 Claude Structures It  →  🎙️ YarnGPT Clones Voice
                                                           ↓
📊 Analytics Track It  ←  🏆 Leaderboard Ranks It  ←  🎬 D-ID Renders Avatar
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧠 **AI Script Engine** | Claude reads the full document and structures content into purposeful episodes with quiz questions built in |
| 🗣️ **Voice Cloning** | YarnGPT generates natural Nigerian-accent audio from the AI-written scripts |
| 🎭 **AI Avatar Generation** | D-ID maps the employee's face and cloned voice into a talking-head video |
| 📺 **Netflix-style Player** | Custom HTML5 video player with mid-episode quiz interruptions and a 28-second countdown timer |
| 🏆 **Leaderboard** | Employees compete on quiz scores, making compliance something people actually want to do |
| 📊 **Compliance Dashboard** | Track who watched, who passed, who hasn't started — with one-click automated reminders |
| 🔒 **Private Studio** | Company content is never shared — each organisation lives in its own private workspace |

---

## 🎬 How It Works

### Step 1 — Upload
The compliance officer uploads a document and a headshot of the employee who will host the series. She selects a voice tone. That's it.

### Step 2 — Claude Reads Everything
Claude doesn't just summarise. It intelligently structures the content into focused episodes:
- **Episode 1:** What is the topic and why it matters
- **Episode 2:** Real-world scenarios and red flags
- **Episode 3:** What to do when something goes wrong

### Step 3 — The AI Pipeline Runs
```
YarnGPT clones the voice  →  D-ID renders the avatar  →  Video is ready
```

### Step 4 — Employees Watch, Answer, Compete
The video plays. At a specific timestamp, it pauses. A quiz slides up. A timer starts. They answer. Points are awarded. The leaderboard updates.

### Step 5 — The Officer Has Evidence
For the first time, she can walk into a regulatory audit with proof — not just that employees *signed* a form, but that they **watched, engaged, answered questions and demonstrated understanding.**

---

## 🏗️ Tech Stack

```
Frontend        →  Vanilla HTML5 / CSS3 / JavaScript (zero dependencies)
AI Brain        →  Claude (Anthropic) — document parsing and script structuring
Voice           →  YarnGPT — Nigerian-accent voice cloning
Avatar          →  D-ID — talking-head video generation from photo + audio
Fonts           →  Plus Jakarta Sans (Google Fonts)
```

---

## 📁 Project Structure

```
castify/
├── index.html              # The entire application — single file
└── assets/
    ├── demo-video.mp4      # Pre-generated D-ID avatar video
    └── employee.jpg        # Employee headshot used as training host
```

> **No framework. No build step. No server.** Open `index.html` in a browser and it runs.

---

## 🚀 Running the Demo

**1. Clone the repository**
```bash
git clone https://github.com/david-iwuoha/castify-demo.git
cd castify
```

**2. Add your assets**

Place your pre-generated D-ID video and employee headshot into the `assets/` folder:
```
assets/demo-video.mp4
assets/employee.jpg
```

**3. Open in browser**
```bash
# Just double-click index.html
# Or use a local server:
npx serve .
```

**4. Set your quiz timestamp**

In `index.html`, find this line and set it to the second in your video where the quiz should appear:
```js
const QUIZ_TIME = 20; // change to your video's timestamp in seconds
```

---

## 🗺️ Roadmap

- [x] Document upload with custom file picker
- [x] AI pipeline animation with live step tracking
- [x] Netflix-style episode rail
- [x] Interactive video player with quiz interruptions
- [x] 28-second countdown timer with animated ring
- [x] Leaderboard and scoring
- [x] Compliance officer analytics dashboard
- [x] Automated reminder system
- [x] Mobile responsive design
- [ ] Real Claude API integration for live script generation
- [ ] Live YarnGPT voice synthesis
- [ ] Live D-ID video generation
- [ ] Multi-company workspace isolation
- [ ] Public catalogue of pre-built regulatory episodes (CBN, SEC, NDPR)

---

## 🌍 Market Context

Every bank, hospital, telecom, and oil company on the African continent has a compliance obligation. Nigerian regulation alone spans:

- **CBN** — Central Bank of Nigeria guidelines
- **SEC** — Securities and Exchange Commission requirements
- **FIRS** — Federal Inland Revenue Service obligations
- **NDPR** — Nigeria Data Protection Regulation
- **Labour Act** — Workplace and HR compliance

Castify starts with Nigeria and scales to every market where regulatory pressure is increasing and the current solution — a PDF and a signature form — is clearly broken.

---

## 🤖 How Claude Powers Castify

Claude is the brain of the entire operation. Given a raw compliance or onboarding document, Claude:

1. **Reads and understands** the full content, not just keywords
2. **Identifies the regulatory framework** and which rules apply
3. **Structures the content** into focused, sequenced episodes with clear learning objectives
4. **Writes the script** for each episode — conversational, clear, and suited to a Nigerian workplace context
5. **Generates quiz questions** with timestamps, correct answers and distractors
6. **Produces episode metadata** including titles, descriptions and duration estimates

Without Claude, Castify is a video player. With Claude, it is an intelligent training system.

---

## 👥 Team

Built with 🖤 for the **Claude AI Hackathon 2025**

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

**Castify** — Because three people reading the PDF is not compliance.

[![Claude](https://img.shields.io/badge/Powered%20by-Claude%20AI-6C3BF5?style=flat-square&logo=anthropic&logoColor=white)](https://anthropic.com)

</div>
