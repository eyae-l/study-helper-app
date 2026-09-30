// Quick script to check database contents
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('\n📊 DATABASE STATUS CHECK:\n');
  
  try {
    // Check Users
    const users = await prisma.user.findMany();
    console.log(`✅ Users table: ${users.length} users found`);
    if (users.length > 0) {
      console.log('   First user:', users[0].email);
    }
    
    // Check Study Sets
    const studySets = await prisma.studySet.findMany();
    console.log(`✅ StudySets table: ${studySets.length} study sets found`);
    if (studySets.length > 0) {
      console.log('   First set:', studySets[0].title);
    }
    
    // Check Flashcards
    const flashcards = await prisma.flashcard.findMany();
    console.log(`✅ Flashcards table: ${flashcards.length} flashcards found`);
    
    // Check Quizzes
    const quizzes = await prisma.quiz.findMany();
    console.log(`✅ Quizzes table: ${quizzes.length} quizzes found`);
    
    // Check Sessions
    const sessions = await prisma.session.findMany();
    console.log(`✅ Sessions table: ${sessions.length} sessions found`);
    
    console.log('\n✅ DATABASE CONNECTION: Working!');
    console.log('✅ ALL TABLES: Created and accessible!');
    
    if (users.length === 0) {
      console.log('\n⚠️  Database is empty - no data yet');
      console.log('   This is normal for a fresh installation');
    }
    
  } catch (error) {
    console.error('\n❌ DATABASE ERROR:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
