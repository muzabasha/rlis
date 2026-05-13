# Reinforcement Learning & Intelligent Systems
## Interactive Educational Platform

A highly interactive static web application for delivering the **Reinforcement Learning & Intelligent Systems** course to engineering students. Built with React + Vite + TypeScript + Tailwind CSS + Framer Motion.

---

## 🚀 Live Demo

Deploy to Vercel: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## ✨ Features

- **Story-Based Learning** — Every topic starts with a funny real-world analogy
- **Mathematical Modelling** — Interactive equations with KaTeX, sliders, and dynamic charts
- **4-Level Activity System** — Teacher Demo → Guided → Group → Individual
- **Project-Based Learning** — Gantt charts, risk analysis, team roles, budget estimation
- **Virtual Labs** — Real-time RL simulations with parameter tuning
- **Question Bank** — 5 model questions per topic with detailed answers
- **Progress Tracking** — Per-topic completion with analytics dashboard
- **Dark/Light Mode** — Full theme support
- **Projector Mode** — Enlarged fonts for classroom projection
- **NEP 2020 Aligned** — Competency-based, outcome-driven learning

---

## 📚 Course Structure

| Unit | Title | Topics |
|------|-------|--------|
| 1 | Introduction to Reinforcement Learning | 6 topics |
| 2 | Markov Decision Process | 5 topics |
| 3 | Policy in MDP & Q-Learning | 5 topics |
| 4 | Intelligent Systems & Agents | 5 topics + Self-Learning |

**Total: 24 topics × 7 sections = 168 content sections**

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 + TypeScript | UI Framework |
| Vite 5 | Build Tool |
| Tailwind CSS 3 | Styling |
| Framer Motion | Animations |
| Recharts | Data Visualization |
| KaTeX / react-katex | Math Equations |
| React Router v6 | Navigation |
| Lucide React | Icons |

---

## 📦 Installation & Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/rl-intelligent-systems.git
cd rl-intelligent-systems

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🌐 Deployment to Vercel

### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 2: Vercel Dashboard
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Set build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install --legacy-peer-deps`
6. Click "Deploy"

---

## 📤 GitHub Deployment

```bash
# Initialize git repository
git init
git add .
git commit -m "feat: initial commit - RL & Intelligent Systems platform"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/rl-intelligent-systems.git
git branch -M main
git push -u origin main
```

---

## 🏗️ Project Structure

```
rl-intelligent-systems/
├── src/
│   ├── App.tsx                    # Main app with routing
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Global styles + Tailwind
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Top navigation bar
│   │   │   ├── Sidebar.tsx        # Course navigation sidebar
│   │   │   └── Layout.tsx         # Page layout wrapper
│   │   └── topic/
│   │       ├── SectionWrapper.tsx # Collapsible section container
│   │       ├── MathBlock.tsx      # KaTeX equation renderer
│   │       └── InfoCard.tsx       # Styled info/tip/warning cards
│   ├── context/
│   │   └── AppContext.tsx         # Global state (dark mode, progress)
│   ├── data/
│   │   └── courseData.ts          # Course structure & metadata
│   ├── modules/
│   │   └── unit1/
│   │       ├── Topic1_EarlyRootsAndNeed.tsx
│   │       └── sections/
│   │           ├── StorySection_T1.tsx    # Section 1: Storytelling
│   │           ├── MathSection_T1.tsx     # Section 2: Math Modelling
│   │           ├── ActivitySection_T1.tsx # Section 3: Activities
│   │           ├── ProjectSection_T1.tsx  # Section 4: Project
│   │           ├── QuestionsSection_T1.tsx # Section 5: Questions
│   │           ├── VirtualLabSection_T1.tsx # Section 6: Virtual Lab
│   │           └── InsightsSection_T1.tsx  # Section 7: Insights
│   ├── pages/
│   │   ├── HomePage.tsx           # Landing page
│   │   ├── TopicPage.tsx          # Topic renderer
│   │   ├── AnalyticsPage.tsx      # Learning analytics
│   │   ├── DependencyGraphPage.tsx # Topic dependency map
│   │   └── SearchPage.tsx         # Search functionality
│   └── types/
│       ├── index.ts               # TypeScript interfaces
│       └── react-katex.d.ts       # Type declarations
├── index.html                     # HTML entry point
├── vite.config.ts                 # Vite configuration
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies
```

---

## 🎯 Course Outcomes Mapping

| CO | Description | Topics |
|----|-------------|--------|
| CO1 | Core components & evolution of RL | U1T1, U1T3, U1T4 |
| CO2 | Differentiate RL, SL, UL, DL | U1T2, U1T5, U1T6 |
| CO3 | MDP structure & formulation | U2T1-U2T5 |
| CO4 | Bellman equation & policies | U3T1-U3T3 |
| CO5 | Q-learning implementation | U3T4, U3T5, U4T4, U4T5 |
| CO6 | PEAS framework & agent types | U4T1-U4T3 |

---

## 📖 Textbook Reference

Sutton, R. S., & Barto, A. G. (2019). *Reinforcement Learning: An Introduction* (2nd ed.). MIT Press.

---

## 🤝 Contributing

This platform follows a recursive content generation strategy:
1. Each topic is built with all 7 mandatory sections
2. Human feedback is incorporated before proceeding to the next topic
3. Content is technically accurate and beginner-friendly

---

## 📄 License

MIT License — Free for educational use.
