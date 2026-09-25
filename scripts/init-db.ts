// Database initialization script
// Run with: npx tsx scripts/init-db.ts

import { initializeDatabase } from '../lib/db';

async function main() {
  console.log('🚀 Starting database initialization...');
  console.log('');
  
  try {
    await initializeDatabase();
    console.log('');
    console.log('✅ Database initialized successfully!');
    console.log('');
    console.log('📊 Created tables:');
    console.log('  - users');
    console.log('  - user_progress');
    console.log('  - flashcard_decks');
    console.log('  - flashcards');
    console.log('  - quizzes');
    console.log('  - quiz_questions');
    console.log('  - quiz_attempts');
    console.log('  - study_notes');
    console.log('  - summaries');
    console.log('  - study_beats');
    console.log('  - mind_maps');
    console.log('  - paper_grades');
    console.log('  - chat_sessions');
    console.log('  - chat_messages');
    console.log('  - user_achievements');
    console.log('  - study_streaks');
    console.log('  - user_preferences');
    console.log('  - usage_analytics');
    console.log('');
    console.log('✅ All indexes created');
    console.log('');
    console.log('🎉 Database is ready to use!');
    
    process.exit(0);
  } catch (error) {
    console.error('');
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

main();
