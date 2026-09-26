// API utility functions for AI generation

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const API_BASE_URL = "https://api.aimlapi.com/v1";

// Debug logging (remove in production)
if (typeof window !== 'undefined') {
  console.log('API Key loaded:', API_KEY ? 'Yes (length: ' + API_KEY.length + ')' : 'No');
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function generateAIResponse(messages: ChatMessage[]): Promise<string> {
  try {
    if (!API_KEY) {
      throw new Error('API key is not configured');
    }

    console.log('Making API request to:', API_BASE_URL);
    
    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI API Error:", error);
    throw error;
  }
}

export async function generateFlashcards(content: string, count: number = 10): Promise<string> {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: "You are an expert educational content creator. Generate flashcards in JSON format with 'question' and 'answer' fields. Make questions clear and answers concise but complete.",
    },
    {
      role: "user",
      content: `Create ${count} flashcards from this content:\n\n${content}\n\nReturn ONLY a JSON array with objects containing 'question' and 'answer' fields. No additional text.`,
    },
  ];

  return generateAIResponse(messages);
}

export async function generateQuiz(content: string, difficulty: string, count: number = 5): Promise<string> {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a quiz generator. Create ${difficulty} difficulty multiple-choice questions with 4 options each. Return ONLY valid JSON format.`,
    },
    {
      role: "user",
      content: `Create ${count} ${difficulty} difficulty quiz questions from this content:\n\n${content}\n\nReturn a JSON array with objects containing: 'question', 'options' (array of 4), 'correctAnswer' (index 0-3), 'explanation'. No additional text.`,
    },
  ];

  return generateAIResponse(messages);
}

export async function generateSummary(content: string, length: "short" | "medium" | "long" = "medium"): Promise<string> {
  const lengthMap = {
    short: "2-3 sentences",
    medium: "1 paragraph (5-7 sentences)",
    long: "2-3 paragraphs with detailed explanation",
  };

  const messages: ChatMessage[] = [
    {
      role: "system",
      content: "You are an expert at creating clear, concise summaries that capture the key points and main ideas.",
    },
    {
      role: "user",
      content: `Summarize this content in ${lengthMap[length]}:\n\n${content}`,
    },
  ];

  return generateAIResponse(messages);
}

export async function generateSmartNotes(content: string): Promise<string> {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: "You are an expert note-taker. Create organized, structured notes with headings, bullet points, and key concepts highlighted. Use markdown formatting.",
    },
    {
      role: "user",
      content: `Create comprehensive smart notes from this content:\n\n${content}\n\nOrganize with:\n- Main topics as headings\n- Key points as bullets\n- Important terms in **bold**\n- Examples when relevant`,
    },
  ];

  return generateAIResponse(messages);
}

export async function generateStudyBeatsLyrics(
  content: string,
  genre: string,
  length: "short" | "medium" | "long" = "medium"
): Promise<string> {
  // Use Gemini API for better results
  const { generateStudyBeatsLyricsWithGemini } = await import("@/lib/gemini-api");
  return generateStudyBeatsLyricsWithGemini(content, genre, length);
}

export async function generateStudyBeatsMusic(
  lyrics: string,
  genre: string,
  length: "short" | "medium" | "long" = "medium"
): Promise<Blob> {
  // Use Lyria 3.5 API through Gemini
  const { generateMusicWithLyria } = await import("@/lib/gemini-api");
  return generateMusicWithLyria(lyrics, genre, length);
}

export async function solveProblem(question: string, subject: string): Promise<string> {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are an expert ${subject} tutor. Provide clear, step-by-step explanations. Break down complex problems into understandable parts.`,
    },
    {
      role: "user",
      content: question,
    },
  ];

  return generateAIResponse(messages);
}

export async function generateMindMap(content: string): Promise<string> {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: "You are an expert at organizing information hierarchically. Create mind map structure in JSON format with 'name' and 'children' fields.",
    },
    {
      role: "user",
      content: `Create a hierarchical mind map from this content:\n\n${content}\n\nReturn ONLY a JSON object with:\n- 'name': main topic\n- 'children': array of subtopics, each with 'name' and optional 'children'\nMax 3 levels deep. No additional text.`,
    },
  ];

  return generateAIResponse(messages);
}

export async function gradePaper(content: string, rubric: string): Promise<string> {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: "You are an experienced teacher providing constructive feedback. Be specific, encouraging, and provide actionable suggestions.",
    },
    {
      role: "user",
      content: `Grade this paper using this rubric:\n\nRUBRIC:\n${rubric}\n\nPAPER:\n${content}\n\nProvide:\n1. Score for each rubric category\n2. Strengths\n3. Areas for improvement\n4. Specific suggestions\n5. Overall grade`,
    },
  ];

  return generateAIResponse(messages);
}
