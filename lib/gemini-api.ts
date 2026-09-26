// Google Gemini API integration

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

interface GeminiMessage {
  role: string;
  parts: { text: string }[];
}

export async function generateWithGemini(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY,
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
  // Handle large content by chunking if necessary
  const maxTokens = 30000; // Conservative estimate (Gemini can handle more)
  const truncatedContent = content.length > maxTokens 
    ? content.substring(0, maxTokens) + "\n\n[Content truncated for processing...]"
    : content;

  const prompt = `You are an expert educational content analyzer. Analyze the following study material and create a comprehensive hierarchical mind map that captures the KEY CONCEPTS and their relationships.

IMPORTANT INSTRUCTIONS:
1. Extract the MAIN TOPIC from the content (this becomes the root node)
2. Identify 3-6 MAJOR CONCEPTS that are central to this topic
3. For each major concept, identify 2-5 SUB-CONCEPTS or supporting ideas
4. Keep node labels concise (2-6 words max)
5. Base EVERYTHING on the actual content - do NOT invent information
6. Create a clear hierarchy: Main Topic → Major Concepts → Sub-Concepts → Details
7. Maximum 4 levels deep
8. Return ONLY valid JSON, no markdown formatting

Content to analyze:
${truncatedContent}

Return a JSON object in this EXACT format:
{
  "title": "Main Topic Name",
  "nodes": [
    {
      "id": "root",
      "label": "Main Topic Name",
      "type": "root",
      "description": "Brief description from the content",
      "children": [
        {
          "id": "concept-1",
          "label": "Major Concept 1",
          "type": "concept",
          "description": "What this concept means based on the content",
          "children": [
            {
              "id": "sub-1-1",
              "label": "Sub-concept",
              "type": "detail",
              "description": "Supporting detail from content",
              "children": []
            }
          ]
        }
      ]
    }
  ]
}

Generate the mind map now:`;

  return generateWithGemini(prompt);
}

export async function generateStudyBeatsLyricsWithGemini(
  content: string,
  genre: string,
  length: "short" | "medium" | "long" = "medium"
): Promise<string> {
  const lengthMap = {
    short: "1 minute song with 1 verse and 1 chorus (about 8-12 lines total)",
    medium: "2-3 minute song with 2 verses, chorus repeated twice, and a bridge (about 20-30 lines)",
    long: "4-5 minute song with intro, 3 verses, chorus repeated 3 times, bridge, and outro (about 40-50 lines)",
  };

  const genreStyles = {
    "lo-fi": "chill, relaxed rhythm with smooth flow. Use simple, memorable phrases with a laid-back vibe",
    "hip-hop": "rhythmic, punchy lines with internal rhymes. Use wordplay and clever metaphors",
    "pop": "catchy, repetitive chorus with upbeat energy. Focus on hooks and singalong moments",
    "synthwave": "nostalgic, electronic vibes with atmospheric lyrics. Use vivid imagery and retro references",
  };

  const prompt = `You are a talented songwriter creating educational music. Transform this study material into memorable ${genre} song lyrics.

STUDY MATERIAL:
${content.substring(0, 2000)} ${content.length > 2000 ? '...(content continues)' : ''}

REQUIREMENTS:
- Length: ${lengthMap[length]}
- Genre style: ${genreStyles[genre as keyof typeof genreStyles] || "engaging and memorable"}
- Include proper sections: [Intro], [Verse 1], [Chorus], [Verse 2], [Bridge], [Outro]
- Make the educational content ACCURATE but transform it into catchy, rhyming lyrics
- Use the actual concepts, terms, and facts from the material
- Make it memorable so students can recall the information by singing
- Use rhyme scheme and rhythm appropriate for ${genre}

EXAMPLE FORMAT:
[Intro]
(Opening lines that introduce the topic)

[Verse 1]
(First set of educational concepts in lyrical form)

[Chorus]
(Catchy, repeated section with main theme)

[Verse 2]  
(More concepts with rhymes)

[Bridge]
(Change in perspective or summary)

[Chorus]
(Repeat)

[Outro]
(Closing thoughts)

Generate the complete song lyrics now:`;

  return generateWithGemini(prompt);
}

export async function generateMusicWithLyria(
  lyrics: string,
  genre: string,
  length: "short" | "medium" | "long" = "medium"
): Promise<Blob> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  // Choose the appropriate model based on length
  const model = length === "short" ? "lyria-3-clip-preview" : "lyria-3.5";
  
  const LYRIA_API_URL = "https://generativelanguage.googleapis.com/v1beta/interactions";

  // Format the prompt with lyrics and genre guidance
  const musicPrompt = `Create a ${genre} song with the following structure and lyrics:

${lyrics}

Music style: ${genre}
Mood: Educational, engaging, memorable
Tempo: Medium
Instrumentation: Full band arrangement appropriate for ${genre}`;

  try {
    console.log(`Generating music with Lyria ${model}...`);
    
    const response = await fetch(LYRIA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        model: model,
        input: musicPrompt,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lyria API Error Response:', errorText);
      console.error('Lyria API Status:', response.status);
      throw new Error(`Lyria API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Lyria API response:', data);

    // Extract the base64-encoded audio from the response
    const audioData = data.interaction?.output_audio?.data;
    
    if (!audioData) {
      throw new Error('No audio data received from Lyria API');
    }

    // Convert base64 to Blob
    const binaryString = atob(audioData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    const audioBlob = new Blob([bytes], { type: 'audio/mpeg' });
    
    console.log(`Generated audio blob: ${audioBlob.size} bytes`);
    return audioBlob;
    
  } catch (error) {
    console.error("Lyria Music Generation Error:", error);
    throw error;
  }
}
