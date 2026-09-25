# StudyHelper - AI-Powered Study Platform

An ultra-modern, AI-powered study platform with a sophisticated dark UI. Transform your study materials into flashcards, quizzes, and personalized learning experiences.

## ✨ Features

- 🎴 **AI Flashcards** - Automatically generate flashcards from any content
- 📝 **Smart Quizzes** - Adaptive quizzes that adjust to your learning level
- 📊 **Study Analytics** - Track progress with detailed insights
- 📄 **Document Upload** - Support for PDFs, notes, and textbooks
- 🎵 **Study Beats** - Focus music and ambient sounds
- 🧠 **Mind Maps** - Visual learning with AI-generated mind maps
- 🤖 **AI Tutor** - Personal AI assistant for homework help
- 📱 **Mobile Friendly** - Study anywhere with responsive design

## 🎨 Design

Ultra-modern dark theme with:
- **Blackish Green** (#1a3329) brand color
- **Teal Accent** (#5eead4) for highlights
- Animated grid backgrounds
- Glass morphism effects
- Sophisticated shadows and glows

## 🚀 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **AI**: OpenAI API

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/eyae-l/study-helper-app.git
cd study-helper-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your DATABASE_URL and OPENAI_API_KEY

# Run database migrations
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## 🗂️ Project Structure

```
study-helper-app/
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── dashboard/       # Dashboard pages
│   └── page.tsx         # Landing page
├── components/          # React components
│   ├── dashboard/       # Dashboard components
│   └── ...             # Landing page components
├── contexts/            # React contexts
├── lib/                # Utility functions
├── prisma/             # Database schema
└── public/             # Static assets
```

## 🌟 Key Components

- **Landing Page**: Hero, Features, Pricing, CTA sections
- **Dashboard**: 10+ study tools including flashcards, quizzes, notes, and more
- **AI Engine**: Powered by OpenAI for content generation
- **Database**: Full schema for users, study sets, flashcards, and progress tracking

## 📝 License

MIT License - feel free to use this project for learning and personal projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and AI
