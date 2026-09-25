// Mock flashcard generator for development without API key

export function generateMockFlashcards(content: string, count: number = 10) {
  // Extract key concepts from the content
  const sentences = content
    .split(/[.!?]\s+/)
    .filter(s => s.trim().length > 10);
  
  const flashcards = [];
  
  // Generate flashcards based on content
  for (let i = 0; i < Math.min(count, sentences.length); i++) {
    const sentence = sentences[i].trim();
    const words = sentence.split(' ');
    
    // Create Q&A from the sentence
    let question, answer;
    
    if (words.length > 5) {
      // Use first part as question, second as answer
      const midpoint = Math.floor(words.length / 2);
      question = `What is ${words.slice(0, midpoint).join(' ')}?`;
      answer = words.slice(midpoint).join(' ');
    } else {
      question = `What does "${sentence}" mean?`;
      answer = sentence;
    }
    
    flashcards.push({
      question: question,
      answer: answer
    });
  }
  
  // If we need more flashcards, generate generic ones
  while (flashcards.length < count) {
    const index = flashcards.length + 1;
    flashcards.push({
      question: `Key concept #${index} from your study material?`,
      answer: `Important point #${index}: Review the material to understand this concept better.`
    });
  }
  
  return flashcards;
}

export function generateMockQuiz(content: string, difficulty: string, count: number = 5) {
  const sentences = content
    .split(/[.!?]\s+/)
    .filter(s => s.trim().length > 10);
  
  const questions = [];
  
  for (let i = 0; i < Math.min(count, sentences.length); i++) {
    const sentence = sentences[i].trim();
    const words = sentence.split(' ');
    const keyword = words.find(w => w.length > 5) || words[0];
    
    questions.push({
      question: `Which statement is correct about ${keyword}?`,
      options: [
        sentence,
        `${keyword} is not related to this topic`,
        `${keyword} requires further study`,
        `None of the above`
      ],
      correctAnswer: 0,
      explanation: `The correct answer is: "${sentence}"`
    });
  }
  
  // Fill remaining questions
  while (questions.length < count) {
    const index = questions.length + 1;
    questions.push({
      question: `Question ${index} based on the study material?`,
      options: [
        "Option A - Review material",
        "Option B - Study concept",
        "Option C - Learn more",
        "Option D - All of above"
      ],
      correctAnswer: 0,
      explanation: "Review your study material for the complete answer."
    });
  }
  
  return questions;
}
