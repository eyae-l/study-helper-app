// Google Gemini API integration

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

interface GeminiMessage {
  role: string;
  parts: { text: string }[];
}

async function generateWithGemini(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error Response:', errorText);
      console.error('Gemini API Status:', response.status);
      console.error('Request URL:', `${GEMINI_API_URL}?key=${GEMINI_API_KEY?.substring(0, 10)}...`);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      throw new Error('No response from Gemini');
    }

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

export async function generateFlashcardsWithGemini(content: string, count: number = 10): Promise<string> {
  const prompt = `You are an expert educational content creator. Generate exactly ${count} flashcards from this content.

Content:
${content}

Return ONLY a JSON array with objects containing 'question' and 'answer' fields. No additional text or formatting.

Example format:
[
  {"question": "What is X?", "answer": "X is..."},
  {"question": "How does Y work?", "answer": "Y works by..."}
]

Generate ${count} flashcards now:`;

  return generateWithGemini(prompt);
}

export async function generateQuizWithGemini(
  content: string,
  difficulty: string,
  count: number = 5
): Promise<string> {
  const prompt = `You are a quiz generator. Create ${count} ${difficulty} difficulty multiple-choice questions from this content.

Content:
${content}

Return ONLY a JSON array with objects containing:
- question: the question text
- options: array of 4 answer choices
- correctAnswer: index of correct answer (0-3)
- explanation: why the answer is correct

Example format:
[
  {
    "question": "What is X?",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": 0,
    "explanation": "A is correct because..."
  }
]

Generate ${count} ${difficulty} questions now:`;

  return generateWithGemini(prompt);
}

export async function generateSummaryWithGemini(
  content: string,
  length: "short" | "medium" | "long" = "medium"
): Promise<string> {
  const lengthMap = {
    short: "2-3 sentences",
    medium: "1 paragraph (5-7 sentences)",
    long: "2-3 paragraphs with detailed explanation",
  };

  const prompt = `Summarize this content in ${lengthMap[length]}:

${content}`;

  return generateWithGemini(prompt);
}

export async function generateSmartNotesWithGemini(content: string): Promise<string> {
  const prompt = `Create organized, structured notes from this content. Use markdown formatting with:
- Main topics as headings (##)
- Key points as bullets (-)
- Important terms in **bold**
- Examples when relevant

Content:
${content}`;

  return generateWithGemini(prompt);
}

export async function solveProblemWithGemini(question: string, subject: string): Promise<string> {
  const prompt = `You are an expert ${subject} tutor. Provide a clear, step-by-step explanation for this question:

${question}

Break down the solution and explain your reasoning.`;

  return generateWithGemini(prompt);
}

export async function generateMindMapWithGemini(content: string): Promise<string> {
  const prompt = `Create a hierarchical mind map structure from this content. Return ONLY valid JSON.

Content:
${content}

Format:
{
  "name": "Main Topic",
  "children": [
    {
      "name": "Subtopic 1",
      "children": [...]
    }
  ]
}

Max 3 levels deep. Generate the mind map now:`;

  return generateWithGemini(prompt);
}
