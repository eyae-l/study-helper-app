// Database connection and utilities
import { neon } from '@neondatabase/serverless';

// Load environment variables
const DATABASE_URL = process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL || 'postgresql://neondb_owner:npg_W4pYkx2BdgDs@ep-lucky-wildflower-b5wwsn5d-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sql = neon(DATABASE_URL);

// Database connection
export async function query(text: string, params?: any[]) {
  try {
    const result = await sql(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Initialize database tables
export async function initializeDatabase() {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        avatar_url TEXT,
        subscription_tier VARCHAR(50) DEFAULT 'free',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      );
    `;

    // Create user_progress table
    await sql`
      CREATE TABLE IF NOT EXISTS user_progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        tool_name VARCHAR(100) NOT NULL,
        total_sessions INTEGER DEFAULT 0,
        total_time_minutes INTEGER DEFAULT 0,
        last_used TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create flashcard_decks table
    await sql`
      CREATE TABLE IF NOT EXISTS flashcard_decks (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        source_material TEXT,
        card_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_studied TIMESTAMP
      );
    `;

    // Create flashcards table
    await sql`
      CREATE TABLE IF NOT EXISTS flashcards (
        id SERIAL PRIMARY KEY,
        deck_id INTEGER REFERENCES flashcard_decks(id) ON DELETE CASCADE,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        position INTEGER NOT NULL,
        times_studied INTEGER DEFAULT 0,
        times_correct INTEGER DEFAULT 0,
        last_studied TIMESTAMP,
        next_review TIMESTAMP,
        ease_factor DECIMAL(3,2) DEFAULT 2.5,
        interval_days INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create quizzes table
    await sql`
      CREATE TABLE IF NOT EXISTS quizzes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        difficulty VARCHAR(50) NOT NULL,
        question_count INTEGER NOT NULL,
        source_material TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create quiz_questions table
    await sql`
      CREATE TABLE IF NOT EXISTS quiz_questions (
        id SERIAL PRIMARY KEY,
        quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
        question TEXT NOT NULL,
        options JSONB NOT NULL,
        correct_answer INTEGER NOT NULL,
        explanation TEXT,
        position INTEGER NOT NULL
      );
    `;

    // Create quiz_attempts table
    await sql`
      CREATE TABLE IF NOT EXISTS quiz_attempts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
        score INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        time_taken_seconds INTEGER,
        answers JSONB,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create study_notes table
    await sql`
      CREATE TABLE IF NOT EXISTS study_notes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        source_material TEXT,
        tags TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create summaries table
    await sql`
      CREATE TABLE IF NOT EXISTS summaries (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        original_text TEXT NOT NULL,
        summary TEXT NOT NULL,
        length_type VARCHAR(50) NOT NULL,
        word_count INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create study_beats table
    await sql`
      CREATE TABLE IF NOT EXISTS study_beats (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        genre VARCHAR(50) NOT NULL,
        lyrics TEXT NOT NULL,
        source_material TEXT,
        length_type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        play_count INTEGER DEFAULT 0
      );
    `;

    // Create mind_maps table
    await sql`
      CREATE TABLE IF NOT EXISTS mind_maps (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        data JSONB NOT NULL,
        source_material TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create paper_grades table
    await sql`
      CREATE TABLE IF NOT EXISTS paper_grades (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        paper_title VARCHAR(255) NOT NULL,
        paper_content TEXT NOT NULL,
        overall_score INTEGER NOT NULL,
        max_score INTEGER NOT NULL,
        grade VARCHAR(10) NOT NULL,
        overall_feedback TEXT,
        criteria_scores JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create chat_sessions table (for Solve AI)
    await sql`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        subject VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create chat_messages table
    await sql`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id SERIAL PRIMARY KEY,
        session_id INTEGER REFERENCES chat_sessions(id) ON DELETE CASCADE,
        role VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create user_achievements table
    await sql`
      CREATE TABLE IF NOT EXISTS user_achievements (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        achievement_type VARCHAR(100) NOT NULL,
        achievement_name VARCHAR(255) NOT NULL,
        description TEXT,
        earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, achievement_type)
      );
    `;

    // Create study_streaks table
    await sql`
      CREATE TABLE IF NOT EXISTS study_streaks (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        current_streak INTEGER DEFAULT 0,
        longest_streak INTEGER DEFAULT 0,
        last_study_date DATE,
        total_study_days INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id)
      );
    `;

    // Create user_preferences table
    await sql`
      CREATE TABLE IF NOT EXISTS user_preferences (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        theme VARCHAR(50) DEFAULT 'dark',
        default_flashcard_count INTEGER DEFAULT 10,
        default_quiz_difficulty VARCHAR(50) DEFAULT 'medium',
        default_summary_length VARCHAR(50) DEFAULT 'medium',
        notifications_enabled BOOLEAN DEFAULT true,
        email_notifications BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id)
      );
    `;

    // Create usage_analytics table
    await sql`
      CREATE TABLE IF NOT EXISTS usage_analytics (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        tool_name VARCHAR(100) NOT NULL,
        action_type VARCHAR(100) NOT NULL,
        metadata JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create indexes for better performance
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_flashcard_decks_user ON flashcard_decks(user_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_flashcards_deck ON flashcards(deck_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_quizzes_user ON quizzes(user_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz ON quiz_questions(quiz_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON quiz_attempts(user_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_study_notes_user ON study_notes(user_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_summaries_user ON summaries(user_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_study_beats_user ON study_beats(user_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_mind_maps_user ON mind_maps(user_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_paper_grades_user ON paper_grades(user_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_chat_sessions_user ON chat_sessions(user_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_usage_analytics_user ON usage_analytics(user_id);`;

    console.log('✅ Database tables created successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}

// Helper functions for common database operations
export const db = {
  // User operations
  async createUser(email: string, name: string, passwordHash: string) {
    const result = await sql`
      INSERT INTO users (email, name, password_hash)
      VALUES (${email}, ${name}, ${passwordHash})
      RETURNING id, email, name, created_at
    `;
    return result[0];
  },

  async getUserByEmail(email: string) {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    return result[0];
  },

  async getUserById(id: number) {
    const result = await sql`
      SELECT id, email, name, avatar_url, subscription_tier, created_at
      FROM users WHERE id = ${id}
    `;
    return result[0];
  },

  async updateLastLogin(userId: number) {
    await sql`
      UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ${userId}
    `;
  },

  // Flashcard operations
  async createFlashcardDeck(userId: number, title: string, sourceMaterial: string) {
    const result = await sql`
      INSERT INTO flashcard_decks (user_id, title, source_material)
      VALUES (${userId}, ${title}, ${sourceMaterial})
      RETURNING *
    `;
    return result[0];
  },

  async createFlashcard(deckId: number, question: string, answer: string, position: number) {
    const result = await sql`
      INSERT INTO flashcards (deck_id, question, answer, position)
      VALUES (${deckId}, ${question}, ${answer}, ${position})
      RETURNING *
    `;
    return result[0];
  },

  async getFlashcardDecks(userId: number) {
    const result = await sql`
      SELECT * FROM flashcard_decks 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;
    return result;
  },

  async getFlashcardsByDeck(deckId: number) {
    const result = await sql`
      SELECT * FROM flashcards
      WHERE deck_id = ${deckId}
      ORDER BY position
    `;
    return result;
  },

  // Chat session operations
  async createChatSession(userId: number, title: string, subject: string) {
    const result = await sql`
      INSERT INTO chat_sessions (user_id, title, subject)
      VALUES (${userId}, ${title}, ${subject})
      RETURNING *
    `;
    return result[0];
  },

  async createChatMessage(sessionId: number, role: string, content: string) {
    const result = await sql`
      INSERT INTO chat_messages (session_id, role, content)
      VALUES (${sessionId}, ${role}, ${content})
      RETURNING *
    `;
    return result[0];
  },

  async getChatSessions(userId: number) {
    const result = await sql`
      SELECT * FROM chat_sessions
      WHERE user_id = ${userId}
      ORDER BY updated_at DESC
    `;
    return result;
  },

  async getChatMessages(sessionId: number) {
    const result = await sql`
      SELECT * FROM chat_messages
      WHERE session_id = ${sessionId}
      ORDER BY created_at ASC
    `;
    return result;
  },

  // Study progress operations
  async updateUserProgress(userId: number, toolName: string, sessionMinutes: number) {
    await sql`
      INSERT INTO user_progress (user_id, tool_name, total_sessions, total_time_minutes)
      VALUES (${userId}, ${toolName}, 1, ${sessionMinutes})
      ON CONFLICT (user_id, tool_name) 
      DO UPDATE SET 
        total_sessions = user_progress.total_sessions + 1,
        total_time_minutes = user_progress.total_time_minutes + ${sessionMinutes},
        last_used = CURRENT_TIMESTAMP
    `;
  },

  async getUserProgress(userId: number) {
    const result = await sql`
      SELECT * FROM user_progress
      WHERE user_id = ${userId}
      ORDER BY last_used DESC
    `;
    return result;
  },

  // Analytics operations
  async logUsage(userId: number, toolName: string, actionType: string, metadata?: any) {
    await sql`
      INSERT INTO usage_analytics (user_id, tool_name, action_type, metadata)
      VALUES (${userId}, ${toolName}, ${actionType}, ${JSON.stringify(metadata || {})})
    `;
  },

  async getUsageStats(userId: number, days: number = 30) {
    const result = await sql`
      SELECT tool_name, COUNT(*) as usage_count
      FROM usage_analytics
      WHERE user_id = ${userId}
        AND created_at >= CURRENT_TIMESTAMP - INTERVAL '${days} days'
      GROUP BY tool_name
      ORDER BY usage_count DESC
    `;
    return result;
  },

  // Study streak operations
  async updateStudyStreak(userId: number) {
    const result = await sql`
      INSERT INTO study_streaks (user_id, current_streak, longest_streak, last_study_date, total_study_days)
      VALUES (${userId}, 1, 1, CURRENT_DATE, 1)
      ON CONFLICT (user_id)
      DO UPDATE SET
        current_streak = CASE
          WHEN study_streaks.last_study_date = CURRENT_DATE - INTERVAL '1 day' 
          THEN study_streaks.current_streak + 1
          WHEN study_streaks.last_study_date = CURRENT_DATE
          THEN study_streaks.current_streak
          ELSE 1
        END,
        longest_streak = GREATEST(
          study_streaks.longest_streak,
          CASE
            WHEN study_streaks.last_study_date = CURRENT_DATE - INTERVAL '1 day'
            THEN study_streaks.current_streak + 1
            ELSE 1
          END
        ),
        last_study_date = CURRENT_DATE,
        total_study_days = study_streaks.total_study_days + 
          CASE WHEN study_streaks.last_study_date < CURRENT_DATE THEN 1 ELSE 0 END,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    return result[0];
  },

  async getStudyStreak(userId: number) {
    const result = await sql`
      SELECT * FROM study_streaks WHERE user_id = ${userId}
    `;
    return result[0];
  }
};

export default sql;
